import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import UserService from "./services/UserService";
import HomeController from './controllers/HomeController';
import config from 'config';

const container: Container = new Container();

container.bind<HomeController>('HomeController').to(HomeController);
container.bind<UserService>('UserService').to(UserService);

let server = new InversifyExpressServer(container);
let port = config.get('server.port');

server.setConfig((app) => {

});

server.build().listen(port, () => {
    console.log(`Server started on port: ${port}`);
});