import { request, response, controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { LoginDTO, CreateUserDTO } from '../dto/user-dto';
import { HttpException } from '../exceptions/http-exception';
import { inject } from 'inversify';
import { AuthService } from '../services/auth-service';
import { UserModel } from '../models/user-model';
import { LoginException } from '../exceptions/login-exception';
import { UserService } from '../services/user-service';

@controller('/api/auth')
export class AuthController {
    constructor(
        @inject(AuthService) private readonly authService: AuthService,
        @inject(UserService) private readonly userService: UserService
    ) {}

    @httpPost('/login')
    public async login(@requestBody() body: LoginDTO, @request() request: Request, @response() response: Response) {
        if (!body.email || !body.password) {
            throw new HttpException(400, 'Please enter all fields');
        }

        const user: UserModel = await this.authService.authenticate(body);

        request.login(user, (error) => {
            if (error) throw new LoginException(501, error.message);

            return response.status(200).json({
                status: 200,
                message: 'Login successfull',
                user
            });
        });
    }

    @httpPost('/register')
    public async register(@requestBody() body: CreateUserDTO, @response() response: Response) {
        if (!body.name || !body.email || !body.password) {
            throw new HttpException(400, 'Please enter all fields');
        }

        const user: UserModel = await this.userService.creatUser(body);
        return response.status(201).json({ user, message: 'User created' });
    }

    @httpPost('/logout')
    @httpGet('/logout')
    public async logout(@request() request: Request, @response() response: Response) {
        request.logout();
        return response.status(200).json({
            status: 200,
            message: 'You have been logged out'
        });
    }
}
