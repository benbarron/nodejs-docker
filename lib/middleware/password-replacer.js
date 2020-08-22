"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordReplacer = void 0;
exports.passwordReplacer = (key, value) => {
    if (key === 'password')
        return undefined;
    else
        return value;
};
