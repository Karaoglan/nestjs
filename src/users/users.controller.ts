import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createUser(@Body() user: UserDto): Promise<UserDto> {
    Logger.log(`UserCtrl - createUSer ${JSON.stringify(user)}`);

    return this.userService.createUser(user);
  }
}