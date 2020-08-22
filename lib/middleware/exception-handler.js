"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandler = void 0;
exports.ExceptionHandler = (error, request, response, next) => {
    if (error) {
        return response.status(error.status).json({
            name: error.name,
            status: error.status,
            message: error.message,
            path: request.url,
            data: error.data
        });
    }
    next();
};
