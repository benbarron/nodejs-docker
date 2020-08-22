import { BaseException } from '../exceptions/base-exception';
import { Request, Response, NextFunction as NF } from 'express';

export const ExceptionHandler = (error: BaseException, request: Request, response: Response, next: NF) => {
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
