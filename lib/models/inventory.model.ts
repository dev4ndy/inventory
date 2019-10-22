import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Inventory extends Model {
    public id!: number;
    public itemId: number;
    public cellarId: number;
    public quantity: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: 'inventories',
        paranoid: true,
        sequelize: database,
        underscored: true,
    },
);
