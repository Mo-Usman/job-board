import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"; 
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum UserRole {
    JOB_POSTER = 'JOB_POSTER',
    JOB_SEEKER = 'JOB_SEEKER',
}

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


    @ApiProperty({ example: 'JOB_SEEKER' })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

}
