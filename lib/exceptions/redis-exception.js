"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisException = void 0;
const base_exception_1 = require("./base-exception");
class RedisException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('RedisException', status, message, data);
    }
}
exports.RedisException = RedisException;
