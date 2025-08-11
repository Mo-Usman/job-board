import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  generateToken(userId: number) {
    return this.jwtService.sign({ sub: userId });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      return user
    }
    throw new UnauthorizedException();
  }

  // Update the entire authentication method

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = this.generateToken(user.id);
    const updatedUser = await this.usersService.updateToken(user.id, token);
    return updatedUser;
  }
}
