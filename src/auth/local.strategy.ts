import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) { 
    super();
    Logger.log('LocalStr - const');
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.log(`LocalStr - valiadate ${username} ${password}`);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
