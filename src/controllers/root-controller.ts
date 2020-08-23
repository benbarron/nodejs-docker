import { httpGet, controller, response, request } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { NotificationService } from '../services/notification-service';

@controller('/api')
export class RootController {
    constructor(@inject(NotificationService) private readonly notificationService: NotificationService) {}

    @httpGet('/')
    public root(@response() response: Response) {
        return response.status(200).json({
            status: 200,
            message: 'Welcome to the api 😁'
        });
    }
}
