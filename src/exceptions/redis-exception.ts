import { BaseException } from './base-exception';

export class RedisException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('RedisException', status, message, data);
    }
}
