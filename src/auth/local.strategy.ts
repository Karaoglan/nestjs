import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) { 
    super();
  }

  async validate(tckn: string, password: string): Promise<any> {
    Logger.log(`LocalStr - valiadate ${tckn} ${password}`);

    const user = await this.authService.validateUser(tckn, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
