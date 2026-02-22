import { Request, Response } from 'express';
import { OracleService } from '../services/oracleService';

export class OracleController {
    static async getYield(req: Request, res: Response) {
        try {
            const data = await OracleService.getYieldData();
            res.set('Cache-Control', 'public, max-age=60');
            res.json(data);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch yield data',
                timestamp: Date.now()
            });
        }
    }
}