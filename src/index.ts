import 'reflect-metadata';
import { Container } from 'inversify';
import { json, Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { passwordReplacer } from './middleware/password-replacer';
import { UserController } from './controllers/user-controller';
import { CacheService } from './services/cache-service';
import { UserService } from './services/user-service';
import { AuthController } from './controllers/auth-controller';
import { AuthService } from './services/auth-service';
import { NotificationService } from './services/notification-service';
import { RootController } from './controllers/root-controller';
import { ExceptionHandler } from './middleware/exception-handler';
import { NotFoundHandler } from './middleware/notfound-handler';
import { strategy, serializeUser, deserializeUser } from './middleware/passport-strategy';
import connectRedis, { RedisStore } from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import redis, { RedisClient } from 'redis';
import config from 'config';
import mongoose from 'mongoose';
import passport from 'passport';
import edge from 'edge.js';

const main = async () => {
    const container: Container = new Container();

    container.bind<RootController>(RootController).toSelf();
    container.bind<UserController>(UserController).toSelf();
    container.bind<AuthController>(AuthController).toSelf();
    container.bind<UserService>(UserService).toSelf();
    container.bind<AuthService>(AuthService).toSelf();
    container.bind<CacheService>(CacheService).toSelf();
    container.bind<NotificationService>(NotificationService).toSelf();

    const server: InversifyExpressServer = new InversifyExpressServer(container);
    const serverPort: number = config.get('server.port');

    const redisSessionSecret: string = config.get('redis.sessionStorage.secret');

    const redisSessionClient: RedisClient = redis.createClient({
        host: config.get('redis.sessionStorage.host') as string,
        port: config.get('redis.sessionStorage.port') as number
    });

    const redisSessionStore: RedisStore = new (connectRedis(session))({
        client: redisSessionClient,
        ttl: 86400
    });

    const sessionOptions: SessionOptions = {
        secret: redisSessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        store: redisSessionStore
    };

    server.setConfig((app: Application) => {
        app.set('json replacer', passwordReplacer);
        app.use(json());
        app.use(session(sessionOptions));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(strategy);
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);
        edge.registerViews(process.cwd() + '/src/templates');
    });

    server.setErrorConfig((app: Application) => {
        app.use(ExceptionHandler);
        app.use(NotFoundHandler);
    });

    await mongoose.connect(config.get('mongo.uri'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });

    server.build().listen(serverPort, () => {
        console.log(`Server started on port: ${serverPort}`);
    });
};

main();
