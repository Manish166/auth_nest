import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/registerUserDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async regiserUser(registerUserDTO: RegisterUserDTO){
        const user = await this.userService.createUser(registerUserDTO)
        console.log('user', user)
        const payload = { sub: user?._id, username: user?.firstName };
        const token = this.jwtService.signAsync(payload)
        console.log('token', token)
        return token;
    }
}
