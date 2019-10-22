import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';
import { AuditTransfer } from './audit-transfer.model';
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
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'items',
        sequelize: database,
        underscored: true,
    },
);

Item.belongsToMany(Cellar, {
    through: { model: Inventory, unique: false },
    foreignKey: { name: 'itemId', field: 'item_id' },
});
Cellar.belongsToMany(Item, {
    through: { model: Inventory, unique: false },
    foreignKey: { name: 'cellarId', field: 'cellar_id' },
});

AuditTransfer.belongsTo(Cellar, {
    foreignKey: { name: 'cellarOriginId', field: 'cellar_origin_id' },
});
AuditTransfer.belongsTo(Cellar, {
    foreignKey: { name: 'cellarDestinyId', field: 'cellar_destiny_id' },
});
AuditTransfer.belongsTo(Item, {
    foreignKey: { name: 'itemId', field: 'item_id' },
});

database.sync({ force: true });
