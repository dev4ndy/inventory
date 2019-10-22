import { DataTypes, Model, Sequelize } from 'sequelize';
import { database } from '../config/database';

export interface IAuditTransfer {
    cellarOriginId: number;
    cellarDestinyId: number;
    itemId: number;
    transferUnits: number;
}

export class AuditTransfer extends Model {
    public id!: number;
    public dateTransfer: Date;
    public timeTransfer: any;
    public cellarOriginId: number;
    public cellarDestinyId: number;
    public itemId: number;
    public transferUnits: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AuditTransfer.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        dateTransfer: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.literal('CURDATE()'),
            field: 'date_transfer',
        },
        timeTransfer: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIME()'),
            field: 'time_transfer',
        },
        transferUnits: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'transfer_units',
        },
    },
    {
        tableName: 'audit_transfer',
        sequelize: database,
        underscored: true,
    },
);
