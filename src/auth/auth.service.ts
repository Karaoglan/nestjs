import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto | null> {
    Logger.log(`AuthServ - validaUse ${username}, ${pass}`);

    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: UserDto) {    
    Logger.log(`AuthServ - login ${JSON.stringify(user)}`);

    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
