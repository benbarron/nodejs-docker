import { BaseException } from './base-exception';

export class CacheException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('CacheException', status, message, data);
    }
}
