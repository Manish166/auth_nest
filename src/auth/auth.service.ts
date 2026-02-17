import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/registerUserDTO';
import { LoginDTO } from './dto/loginDTO';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async regiserUser(registerUserDTO: RegisterUserDTO){
        const user = await this.userService.createUser(registerUserDTO)
        const payload = { sub: user?._id, username: user?.firstName };
        const token = this.jwtService.signAsync(payload)
        return token;
    }

    async login(loginDTO: LoginDTO){
        const user = await this.userService.getUser(loginDTO)
        const isMatch = await argon2.verify(user.passwordHashed, loginDTO.password)
        if (isMatch) {
            const payload = { sub: user?._id, username: user?.firstName };
            const token = this.jwtService.signAsync(payload)
            return token;
        } else {
            throw new UnauthorizedException('Invalid username or password')
        }
    }
}
