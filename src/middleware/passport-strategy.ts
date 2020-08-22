import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel, User } from '../models/user-model';
import { compare } from 'bcryptjs';

export const strategy: LocalStrategy = new LocalStrategy(async (email: string, password: string, done: any) => {
    try {
        const user: UserModel | null = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'User not found with given email' });
        }

        if (!compare(password, user.password)) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export const serializeUser = (user: UserModel, done: any) => {
    done(null, user.id);
};

export const deserializeUser = async (id: string, done: any) => {
    try {
        const user: UserModel | null = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
};
