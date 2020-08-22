"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const base_exception_1 = require("./base-exception");
class UnauthorizedException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('UnauthorizedException', status, message, data);
    }
}
exports.UnauthorizedException = UnauthorizedException;
