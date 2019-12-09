import { Controller, UseGuards, Body, Post, Logger, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserDto } from '../users/dto/user.dto';
import { User } from 'src/users/interfaces/user.interface';
import { UserLoginResDto } from './dto/user-login.res.dto';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<UserLoginResDto> {
    Logger.log(`AppCtrl - login ${JSON.stringify(req.user)}`);
    return this.authService.login(req.user);
  }

  @Post('/signUp')
  async signUp(@Body() user: UserSignupDto): Promise<UserSignupDto> {
    Logger.log(`AppCtrl - login ${JSON.stringify(user)}`);
    return this.authService.signUp(user);
  }

}
