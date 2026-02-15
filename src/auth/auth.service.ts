import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/registerUserDTO';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async regiserUser(registerUserDTO: RegisterUserDTO){
        const user = await this.userService.createUser(registerUserDTO)
        console.log('user', user)
        return {};
    }
}
