import { Controller, UseGuards, Body, Post, Logger, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserDto } from './users/dto/user.dto';
import { UserLoginDto } from './auth/dto/user-login.dto';
import { CreateUserDto } from './users/dto/create.user.dto';
import { UserSignupDto } from './auth/dto/user-signup.dto';

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<UserLoginDto> {
    Logger.log(`AppCtrl - login ${JSON.stringify(req.user)}`);
    return this.authService.login(req.user as UserLoginDto);
  }

  @Post('/signUp')
  async signUp(@Body() user: UserSignupDto): Promise<UserSignupDto> {
    Logger.log(`AppCtrl - login ${JSON.stringify(user)}`);
    return this.authService.signUp(user);
  }

}
