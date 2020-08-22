import { Schema, Document, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface _User {
    name: string;
    email: string;
    password: string;
    dateCreated?: Date;
}

export interface UserModel extends _User, Document {}

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function (next) {
    const user = this as UserModel;

    if (!user.isModified('password')) {
        return next();
    }

    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
});

export const User: Model<UserModel, {}> = model<UserModel>('users', UserSchema);
