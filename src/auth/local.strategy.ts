import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'tckn',
      passwordField: 'password',
    });
  }

  async validate(tckn: string, password: string): Promise<User> {
    Logger.log(`LocalStr - valiadate ${tckn} ${password}`);

    const user = await this.authService.validateUser(tckn, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
