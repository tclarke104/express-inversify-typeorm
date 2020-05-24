import 'reflect-metadata';
import { InversifyExpressServer, TYPE } from 'inversify-express-utils';
// import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import { container } from './bindings';
import './controllers';
import { createConnection, Connection } from 'typeorm';
import { TYPES } from './constants/types';
import jwt from 'express-jwt';
import { AppSettings } from './constants/appSettings';

const configServer = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}

const configError = (app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send(err);
    });
}

createConnection().then(connection => {
    container.bind<Connection>(TYPES.DatabaseConnection).toConstantValue(connection);
    let server = new InversifyExpressServer(container);

    server.setConfig(configServer)
    server.setErrorConfig(configError);

    let app = server.build();
    app.listen(AppSettings.port);
    console.log(`server listening on port ${AppSettings.port}`)
})
