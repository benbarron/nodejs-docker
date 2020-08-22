import { injectable, inject } from 'inversify';
import { User, UserModel } from '../models/user-model';
import { CreateUserDTO } from '../dto/user-dto';
import { HttpException } from '../exceptions/http-exception';

@injectable()
export class UserService {
    public async getAll() {
        return await User.find();
    }

    public async findById(id: string) {
        return await User.findById(id);
    }

    public async findByEmail(email: string) {
        return await User.findOne({ email });
    }

    public async creatUser(userDTO: CreateUserDTO) {
        try {
            const user: UserModel = await User.create(userDTO);
            return await user.save();
        } catch (err) {
            throw new HttpException(501, err.message);
        }
    }
}
