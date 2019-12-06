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

  async validateUser(tckn: string, pass: string): Promise<UserDto | null> {
    Logger.log(`AuthServ - validaUse ${tckn}, ${pass}`);

    const user = await this.usersService.findOne(tckn);
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: UserDto) {    
    Logger.log(`AuthServ - login ${JSON.stringify(user)}`);

    const payload = { tckn: user.tckn, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async signUp(user: UserDto): Promise<UserDto> {    
    Logger.log(`AuthServ - signUp ${JSON.stringify(user)}`);

    return user;
  }


}
