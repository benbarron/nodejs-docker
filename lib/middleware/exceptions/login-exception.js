"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginException = void 0;
const base_exception_1 = require("./base-exception");
class LoginException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('LoginException', status, message, data);
    }
}
exports.LoginException = LoginException;
