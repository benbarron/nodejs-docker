import { BaseException } from './base-exception';

export class HttpException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('HttpException', status, message, data);
    }
}
