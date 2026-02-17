import { LoginDTO } from './../auth/dto/loginDTO';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDTO } from 'src/auth/dto/registerUserDTO';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(registerUserDTO: RegisterUserDTO){
        const passsword: string = registerUserDTO.password;
        try {
            const hash = await argon2.hash(passsword, {
                type: argon2.argon2id, // Modern hybrid variant
                memoryCost: 65536,    // 64 MiB
                timeCost: 3,          // 3 iterations
                parallelism: 4,       // 4 threads
            }); 
            return await this.userModel.create({
                firstName: registerUserDTO.firstName,
                lastName: registerUserDTO.lastName,
                email: registerUserDTO.email,
                password: hash,
            })
        } catch (error: unknown) {
            const err = error as { code?: number };
            const DUPLICATE_KEY_ERROR_CODE = 11000;
            if (err.code === DUPLICATE_KEY_ERROR_CODE) {
                throw new ConflictException('Email already exists.'); // Throw a 409 Conflict error
            }
            throw error; // Rethrow other errors
        }
    };

    async getUser(loginDTO: LoginDTO){
        const requestEmail: string = loginDTO.email;
        const user = await this.userModel.findOne({email: requestEmail})
        if (!user) {
            throw new UnauthorizedException('Invalid username or password')
        } else {
            return user
        }
    };
}
