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
    }
}
