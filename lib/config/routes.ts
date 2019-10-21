import { Application } from 'express';
import { ItemController } from '../controllers/item.controller';
import { InventoryController } from '../controllers/inventory.controller';

export class Routes {
    public itemController: ItemController = new ItemController();
    public inventoryController: InventoryController = new InventoryController();

    public routes(app: Application): void {
        app.route('/inventory/cellar').get(this.inventoryController.byCellar);
    }
}
