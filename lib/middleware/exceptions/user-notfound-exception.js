"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const base_exception_1 = require("./base-exception");
class UserNotFoundException extends base_exception_1.BaseException {
    constructor(status, message, data = {}) {
        super('UserNotFoundException', status, message, data);
    }
}
exports.UserNotFoundException = UserNotFoundException;
