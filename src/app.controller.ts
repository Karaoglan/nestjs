import { Controller, Get, UseGuards, Body, Post, Logger, UseInterceptors, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    Logger.log(`AppCtrl - getHello`);
    return this.appService.getHello();
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    //Logger.log(`AppCtrl - login ${JSON.stringify(req)}`);
    console.log('app ctrl login in')
    return this.authService.login(req.user);
  }

}