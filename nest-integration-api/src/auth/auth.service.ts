import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  signIn(username: string, pass: string): any {
    const user = this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.userName };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(password: string): Promise<string> {
    const response = await bcrypt.hash(password, 10);
    return response;
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
