"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const base_exception_1 = require("./base-exception");
class InvalidCredentialsException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('InvalidCredentialsException', status, message, data);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
