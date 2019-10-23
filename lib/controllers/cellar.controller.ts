import { Request, Response } from 'express';
import { Cellar } from '../models/cellar.model';

export class CellarController {
    public async index(req: Request, res: Response) {
        return res.status(200).json(await Cellar.findAll());
    }
}
