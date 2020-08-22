"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const base_exception_1 = require("./base-exception");
class HttpException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('HttpException', status, message, data);
    }
}
exports.HttpException = HttpException;
