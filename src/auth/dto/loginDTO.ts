import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;
}
