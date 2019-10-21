import { Sequelize } from 'sequelize';

export const database = new Sequelize({
    database: 'inventory',
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '295{&)N`guHaLgam',
    port: 3306,
});
