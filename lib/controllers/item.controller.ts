import { Request, Response } from 'express';

export class ItemController {
    public index(req: Request, res: Response) {
        res.json({
            message: 'Lista',
        });
    }
}
