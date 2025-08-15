import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { UserRole } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    // Things to do:
    // 1: @Roles(UserRole.JOB_POSTER)
    // 2: Solve the above error (solved) 
    // 3: Write swagger documentation for role property in create user DTO
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }


    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Return all users' })
    findAll() {
        return this.userService.findAll();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user' })
    @ApiResponse({ status: 404, description: 'User not found' })
    findById(@Param('id') id: number) {
        return this.userService.findById(Number(id));
    }


    @Post(':id')
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiOperation({ summary: 'Update a user by ID' })
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }


    @Post(':id/delete')
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiOperation({ summary: 'Delete a user by ID' })
    delete(@Param('id') id: number) {
        return this.userService.delete(Number(id));
    }
}
