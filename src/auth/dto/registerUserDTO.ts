import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDTO {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    lastName?: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;
}

