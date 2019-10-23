import { CellarController } from '../controllers/cellar.controller';
import { Application } from 'express';
import { InventoryController } from '../controllers/inventory.controller';

export class Routes {
    public cellarController: CellarController = new CellarController();
    public inventoryController: InventoryController = new InventoryController();

    public routes(app: Application): void {
        app.route('/inventory/cellar').get(this.inventoryController.byCellar);
        app.route('/inventory/transfer').post(this.inventoryController.transfer);
        app.route('/cellar/index').get(this.cellarController.index);
    }
}
