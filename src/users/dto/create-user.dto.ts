import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"; 
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'john_doe' })
    @IsString()
    @IsNotEmpty()
    name: string;


    @ApiProperty({ example: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    // constructor(name: string, email: string, password: string) {
    //     this.name = name;
    //     this.email = email;
    //     this.password = password;
    // }
}
