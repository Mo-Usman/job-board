import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
        ) {}

    async findByEmail(email: string) {
            return this.prisma.user.findUnique({ where: { email } });
        }
        
    async validatePassword(plainText: string, hashed: string): Promise<boolean> {
            return bcrypt.compare(plainText, hashed);
        }    

    async updateToken(id: number, token: string) {
            return this.prisma.user.update({ where: { id }, data: { token } });
        }    

    // Create User
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
        const user = await this.prisma.user.create({
          data: {
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
          },
        });
      
        const token = this.jwtService.sign({ userId: user.id });
      
        const updatedUser = await this.prisma.user.update({
          where: { id: user.id },
          data: { token },
        });
      
        return updatedUser;
      }
      



    // Find all users
    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }


    // Find user by ID
    async findById(id: number): Promise<User | null> {
        const user = this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw Error(`User with ID ${id} not found`);
        }

        return user
    }


    // Update user by ID
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, 10) as string;

            return this.prisma.user.update({
                where: { id },
                data: {
                    name: updateUserDto.name,
                    email: updateUserDto.email,
                    password: hashedPassword,
                }
            });
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email
            }
        });
    }



    // Delete user by ID
    async delete(id: number): Promise<User> {
        try {
            return this.prisma.user.delete({
                where: { id }
            });
        } catch (err) {
            throw Error(`User with ID ${id} not found`);
        }
    }
}
