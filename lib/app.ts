import { Application } from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './config/routes';


export class App {
    public app: Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

    }
}
