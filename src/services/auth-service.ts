import { injectable, inject } from 'inversify';
import { LoginDTO } from '../dto/user-dto';
import { compare } from 'bcryptjs';
import { UserModel } from '../models/user-model';
import { UserNotFoundException } from '../exceptions/user-notfound-exception';
import { UserService } from './user-service';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials-exception';

@injectable()
export class AuthService {
    constructor(@inject(UserService) private readonly userService: UserService) {}

    public async authenticate({ email, password }: LoginDTO) {
        const user: UserModel | null = await this.userService.findByEmail(email);

        if (!user) {
            throw new UserNotFoundException(404, 'User not found with email ' + email);
        }

        if (!(await compare(password, user.password))) {
            throw new InvalidCredentialsException(401, 'Invalid credentials');
        }

        return user;
    }

    public async sendForgotPasswordEmail() {}
}
