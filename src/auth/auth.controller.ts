import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from './dto/registerUserDTO';
import { LoginDTO } from './dto/loginDTO';

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

    @Post('login')
    login(@Body() loginDTO : LoginDTO){
        const result = this.authService.login(loginDTO);
        return result;
    }
}
