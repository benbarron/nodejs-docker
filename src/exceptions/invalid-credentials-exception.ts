import { BaseException } from './base-exception';

export class InvalidCredentialsException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('InvalidCredentialsException', status, message, data);
    }
}
