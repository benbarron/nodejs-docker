"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var HomeController_1 = __importDefault(require("./controllers/HomeController"));
var HomeService_1 = __importDefault(require("./services/HomeService"));
var HomeRepository_1 = __importDefault(require("./repositories/HomeRepository"));
var container = new inversify_1.Container();
container.bind('HomeController').to(HomeController_1.default);
container.bind('HomeService').to(HomeService_1.default);
container.bind('HomeRepository').to(HomeRepository_1.default);
exports.default = container;
