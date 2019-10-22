import { Request, Response } from 'express';
import { Transaction } from 'sequelize/types';
import { database } from '../config/database';
import { eventEmitter } from '../events/events';
import { IAuditTransfer } from '../models/audit-transfer.model';
import { Cellar } from '../models/cellar.model';
import { Inventory } from '../models/inventory.model';
import { Item } from '../models/item.model';


export class InventoryController {

    public async byCellar(req: Request, res: Response) {
        const cellarId = req.query.cellarId;

        if (!cellarId) {
            return res.status(500).json({ message: 'Cellar param is required.' });
        }
        try {
            const cellar = await Cellar.findByPk(cellarId, {
                include: [{
                    model: Item,
                    through: {
                        attributes: ['quantity'],
                    },
                }],
            });
            return res.status(200).json(cellar);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async transfer(req: Request, res: Response) {
        const itemId = req.body.itemId;
        const cellarOriginId = req.body.cellarOriginId;
        const cellarDestinyId = req.body.cellarDestinyId;
        const transferUnits = +req.body.units;

        if (!itemId || !cellarOriginId || !cellarDestinyId || !transferUnits) {
            return res.status(500).json({ message: 'item id, cellar origin, cellar destiny and units are required.' });
        }

        let transaction: Transaction;
        try {
            transaction = await database.transaction();

            const inventory = await Inventory.findOne({
                attributes: ['id', 'quantity'],
                where: { cellar_id: cellarOriginId, item_id: itemId },
            });

            if (inventory == null) {
                return res.status(500).json(
                    { message: 'Item or origin cellar not exist.' },
                );
            }

            if (inventory.quantity <= 0 || transferUnits > inventory.quantity) {
                return res.status(500).json(
                    { message: 'It cannot be transferred, because there is not enough stock in the original warehouse' },
                );
            }

            await inventory.update({
                quantity: inventory.quantity - transferUnits,
            });

            const inventoryDestiny = await Inventory.findOne({
                attributes: ['id', 'quantity'],
                where: { cellar_id: cellarDestinyId, item_id: itemId },
            });

            let inventoryTransfer: Inventory;
            if (!inventoryDestiny) {
                inventoryTransfer = await Inventory.create({
                    item_id: itemId,
                    cellar_id: cellarDestinyId,
                    quantity: transferUnits,
                });
            } else {
                inventoryTransfer = await inventoryDestiny.update({
                    quantity: inventoryDestiny.quantity + transferUnits,
                });
            }

            const auditTransfer = {
                cellarOriginId,
                cellarDestinyId,
                itemId,
                transferUnits,
            } as IAuditTransfer;
            eventEmitter.emit('audit', auditTransfer);

            await transaction.commit();

            return res.status(200).json({
                message: 'successful operation',
                data: inventoryTransfer,
            });
        } catch (error) {
            if (transaction) { await transaction.rollback(); }
            return res.status(500).json(error);
        }
    }
}
