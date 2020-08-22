import { BaseException } from './base-exception';

export class LoginException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('LoginException', status, message, data);
    }
}
