import { httpGet, controller, response } from 'inversify-express-utils';
import { Response } from 'express';

@controller('/api')
export class RootController {
    @httpGet('/')
    public root(@response() response: Response) {
        return response.status(200).json({
            status: 200,
            message: 'Welcome to the api 😁'
        });
    }
}
