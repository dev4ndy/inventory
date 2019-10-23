import { Sequelize } from 'sequelize';

export const database = new Sequelize({
    database: 'inventory',
    dialect: 'mysql',
    host: 'localhost',
    username: '',
    password: '',
    port: 3306,
});
