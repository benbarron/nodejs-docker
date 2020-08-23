import { injectable } from 'inversify';
import { CacheException } from '../exceptions/cache-exception';
import redis from 'redis';
import config from 'config';

@injectable()
export class CacheService {
    private client: redis.RedisClient;

    constructor() {
        this.client = redis.createClient({
            host: config.get('redis.appCache.host') as string,
            port: config.get('redis.appCache.port') as number
        });
    }

    public async get(key: string) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, data) => {
                if (error) reject(new CacheException(501, error?.message));
                resolve(data);
            });
        });
    }

    public async set(key: string, value: string, timeout: number = 3600) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, timeout, value, (error) => {
                if (error) reject(new CacheException(501, error.message));
                resolve();
            });
        });
    }
}
