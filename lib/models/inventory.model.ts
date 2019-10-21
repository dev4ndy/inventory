import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { database } from '../config/database';

export class Inventory extends Model {
    public quantity: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Inventory.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: 'inventories',
        paranoid: false,
        sequelize: database,
    },
);
