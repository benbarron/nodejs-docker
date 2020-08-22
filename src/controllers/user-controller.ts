import { inject } from 'inversify';
import { Request, Response } from 'express';
import { controller, httpGet, response, request } from 'inversify-express-utils';
import { UserService } from '../services/user-service';
import { UnauthorizedException } from '../exceptions/unauthorized-exception';
import { UserModel } from '../models/user-model';

@controller('/api/users')
export class UserController {
    constructor(@inject(UserService) private readonly userService: UserService) {}

    @httpGet('/all')
    public async get(@request() request: Request, @response() response: Response) {
        const users: UserModel[] = await this.userService.getAll();
        return response.status(200).json({
            status: 200,
            users
        });
    }

    @httpGet('/current')
    public async current(@request() request: Request, @response() response: Response) {
        if (!request.user) {
            throw new UnauthorizedException(401, 'You are not logged in');
        }

        return response.status(200).json({
            user: request.user
        });
    }
}
