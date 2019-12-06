import { Controller, Get, UseGuards, Body, Post, Logger, UseInterceptors, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserDto } from './users/dto/user.dto';

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    Logger.log(`AppCtrl - login ${JSON.stringify(req.user)}`);
    return this.authService.login(req.user);
  }

  @Post('/signUp')
  async signUp(@Body() user: UserDto) {
    Logger.log(`AppCtrl - login ${JSON.stringify(user)}`);
    return this.authService.signUp(user);
  }

}