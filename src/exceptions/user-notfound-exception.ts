import { BaseException } from './base-exception';

export class UserNotFoundException extends BaseException {
    constructor(status: number, message: string, data: any = {}) {
        super('UserNotFoundException', status, message, data);
    }
}
