import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {

    @ApiProperty({ example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    password: string;

    // constructor(username: string, password: string) {
    //     this.username = username;
    //     this.password = password;
    // }
}
