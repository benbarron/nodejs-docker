import { Request, Response } from 'express';

export const NotFoundHandler = (request: Request, response: Response) => {
    return response.status(404).json({
        path: request.url,
        message: `Path ${request.url} could not be found`,
        status: 404
    });
};
