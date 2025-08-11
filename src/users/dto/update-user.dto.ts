import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"; 
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ example: 'john_doe' })
    @IsString()
    name: string;


    @ApiProperty({ example: 'johndoe@example.com' })
    @IsEmail()
    email: string;


    @ApiProperty({ example: 'password123' })
    @IsString()
    password: string;
}
