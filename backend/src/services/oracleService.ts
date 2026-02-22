import axios from 'axios';
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis(REDIS_URL);

const CACHE_KEY = 'rwa:yield_rate';
const CACHE_TTL = 300; // 5 minutes
const API_URL = process.env.RWA_API_URL || 'https://api.ondo.finance/yield';
const API_KEY = process.env.RWA_API_KEY;

export interface YieldData {
    rate: number;
    timestamp: number;
    source: string;
    stale: boolean;
}

export class OracleService {
    static async getYieldData(): Promise<YieldData> {
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }

        try {
            const response = await axios.get(API_URL, {
                headers: API_KEY ? { 'Authorization': `Bearer ${API_KEY}` } : undefined,
                timeout: 5000
            });

            const rate = Number(response.data.apy || response.data.yield || 0);

            if (isNaN(rate) || rate === 0) {
                throw new Error('Invalid rate received from Oracle');
            }

            const data: YieldData = {
                rate,
                timestamp: Date.now(),
                source: 'RWA_PROVIDER',
                stale: false
            };

            await redis.set(CACHE_KEY, JSON.stringify(data), 'EX', CACHE_TTL);
            await redis.set(`${CACHE_KEY}:backup`, JSON.stringify(data));

            return data;

        } catch (error) {
            console.error('Oracle Service Error:', error);
            const backup = await redis.get(`${CACHE_KEY}:backup`);
            if (backup) {
                const data = JSON.parse(backup);
                return { ...data, stale: true, timestamp: Date.now() };
            }
            return { rate: 4.5, timestamp: Date.now(), source: 'FALLBACK_DEFAULT', stale: true };
        }
    }
}