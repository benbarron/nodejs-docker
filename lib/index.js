"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const express_1 = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const password_replacer_1 = require("./middleware/password-replacer");
const user_controller_1 = require("./controllers/user-controller");
const cache_service_1 = require("./services/cache-service");
const user_service_1 = require("./services/user-service");
const auth_controller_1 = require("./controllers/auth-controller");
const auth_service_1 = require("./services/auth-service");
const notification_service_1 = require("./services/notification-service");
const root_controller_1 = require("./controllers/root-controller");
const exception_handler_1 = require("./middleware/exception-handler");
const notfound_handler_1 = require("./middleware/notfound-handler");
const passport_strategy_1 = require("./middleware/passport-strategy");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const edge_js_1 = __importDefault(require("edge.js"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const container = new inversify_1.Container();
    container.bind(root_controller_1.RootController).toSelf();
    container.bind(user_controller_1.UserController).toSelf();
    container.bind(auth_controller_1.AuthController).toSelf();
    container.bind(user_service_1.UserService).toSelf();
    container.bind(auth_service_1.AuthService).toSelf();
    container.bind(cache_service_1.CacheService).toSelf();
    container.bind(notification_service_1.NotificationService).toSelf();
    const server = new inversify_express_utils_1.InversifyExpressServer(container);
    const serverPort = config_1.default.get('server.port');
    const redisSessionSecret = config_1.default.get('redis.sessionStorage.secret');
    const redisSessionClient = redis_1.default.createClient({
        host: config_1.default.get('redis.sessionStorage.host'),
        port: config_1.default.get('redis.sessionStorage.port')
    });
    const redisSessionStore = new (connect_redis_1.default(express_session_1.default))({
        client: redisSessionClient,
        ttl: 86400
    });
    const sessionOptions = {
        secret: redisSessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        store: redisSessionStore
    };
    server.setConfig((app) => {
        app.set('json replacer', password_replacer_1.passwordReplacer);
        app.use(express_1.json());
        app.use(express_session_1.default(sessionOptions));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        passport_1.default.use(passport_strategy_1.strategy);
        passport_1.default.serializeUser(passport_strategy_1.serializeUser);
        passport_1.default.deserializeUser(passport_strategy_1.deserializeUser);
        edge_js_1.default.registerViews(process.cwd() + '/src/templates');
    });
    server.setErrorConfig((app) => {
        app.use(exception_handler_1.ExceptionHandler);
        app.use(notfound_handler_1.NotFoundHandler);
    });
    yield mongoose_1.default.connect(config_1.default.get('mongo.uri'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    server.build().listen(serverPort, () => {
        console.log(`Server started on port: ${serverPort}`);
    });
});
main();
