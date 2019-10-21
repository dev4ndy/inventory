import { Request, Response } from 'express';
import { Cellar } from '../models/cellar.model';
import { Item } from '../models/item.model';
import { Inventory } from 'models/inventory.model';


export class InventoryController {
    public async byCellar(req: Request, res: Response) {
        const bodegaId = req.params.bodegaId;
        Cellar.findByPk(bodegaId, {
            include: [{
                model: Item,
                through: {
                    attributes: ['quantity', 'createdAt', 'updatedAt'],
                },
            }],
        }).then((cellar: Cellar) => res.status(200).json(cellar))
            .catch((err: Error) => res.status(500).json(err));
    }

    public async transfer(req: Request, res: Response) {
        const itemId = req.params.itemId;
        const cellarOriginId = req.params.cellarOriginId;
        const cellarDestinyId = req.params.cellarDestinyId;
        const units = +req.params.units;

        try {
            const inventory = await Inventory.findOne({
                attributes: ['quantity'],
                where: { cellar_id: cellarOriginId, item_id: itemId },
            });
            if (inventory.quantity <= 0 || units >= inventory.quantity) {
                return res.status(500).json({ message: 'It cannot be transferred, because there is not enough stock in the original warehouse' });
            }

            const inventoryTransfer = await Inventory.findOrCreate({
                where: { cellar_id: cellarDestinyId, item_id: itemId },
                defaults: { quantity: units },
            });

            return res.status(200).json(inventoryTransfer);
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.error(error);
            return res.status(500).json(error);
        }
    }
}
