"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = void 0;
exports.NotFoundHandler = (request, response) => {
    return response.status(404).json({
        path: request.url,
        message: `Path ${request.url} could not be found`,
        status: 404
    });
};
