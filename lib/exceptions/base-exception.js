"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
class BaseException {
    constructor(name, status, message, data = {}) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
exports.BaseException = BaseException;
