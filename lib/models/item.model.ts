import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../config/database';
import { Cellar } from './cellar.model';
import { Inventory } from './inventory.model';

export class Item extends Model {
    public id!: number;
    public name: string;
    public description: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'items',
        sequelize: database,
    },
);

Item.belongsToMany(Cellar, {
    through: { model: Inventory, unique: false }, foreignKey: 'item_id',
});
Cellar.belongsToMany(Item, {
    through: { model: Inventory, unique: false }, foreignKey: 'cellar_id',
});

// Cellar.sync({ force: true })
//     // tslint:disable-next-line: no-console
//     .then(() => console.log('Cellar table created.'))
//     // tslint:disable-next-line: no-console
//     .catch(() => console.error('Cellar table not created.'));
// Item.sync({ force: true })
//     // tslint:disable-next-line: no-console
//     .then(() => console.log('Item table created.'))
//     // tslint:disable-next-line: no-console
//     .catch(() => console.error('Item table not created.'));
// Inventory.sync({ force: true })
//     // tslint:disable-next-line: no-console
//     .then(() => console.log('Inventory table created.'))
//     // tslint:disable-next-line: no-console
//     .catch(() => console.error('Inventory table not created.'));
database.sync();

