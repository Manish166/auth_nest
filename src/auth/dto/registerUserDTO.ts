import { IsString } from "class-validator";

export class RegisterUserDTO {
    @IsString()
    firstName!: string;

    @IsString()
    lastName?: string;

    @IsString()
    passwordHashed!: string;

    @IsString()
    email!: string;
}

