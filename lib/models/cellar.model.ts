import { DataTypes, Model } from 'sequelize';
import { database } from '../config/database';

export class Cellar extends Model {
    public id!: number;
    public name: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cellar.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'cellars',
        sequelize: database,
        underscored: true,
    },
);


