import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dto/registerUserDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){
        this.authService = authService
    }
    @Post('register')
    register(@Body() registerUserDTO : RegisterUserDTO){
        const result = this.authService.regiserUser(registerUserDTO);
        return result;
    }
}
