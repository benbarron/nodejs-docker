"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_express_utils_1 = require("inversify-express-utils");
var inversify_1 = require("inversify");
var HomeService_1 = __importDefault(require("./services/HomeService"));
var HomeRepository_1 = __importDefault(require("./repositories/HomeRepository"));
var HomeController_1 = __importDefault(require("./controllers/HomeController"));
var config_1 = __importDefault(require("config"));
var container = new inversify_1.Container();
container.bind('HomeController').to(HomeController_1.default);
container.bind('HomeService').to(HomeService_1.default);
container.bind('HomeRepository').to(HomeRepository_1.default);
var server = new inversify_express_utils_1.InversifyExpressServer(container);
var port = config_1.default.get('server.port');
server.setConfig(function (app) { });
server.build().listen(port, function () {
    console.log("Server started on port: " + port);
});
