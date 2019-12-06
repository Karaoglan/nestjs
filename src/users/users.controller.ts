import { Controller, Post, Body, UseGuards, Logger, Get, Param, Put, Delete } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiHeader, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('cats')
@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 401, description: 'The record is invalid'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() user: UserDto): Promise<UserDto> {
    Logger.log(`UserCtrl - createUSer ${JSON.stringify(user)}`);

    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<UserDto[] | []> {
    Logger.log(`UserCtrl - getAll`);
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param() params): Promise<UserDto> {
    Logger.log(`UserCtrl - findById ${params.id}`);

    return this.userService.findByID(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() user: UserDto): Promise<UserDto> {
    Logger.log(`UserCtrl - update ${params.id} - ${JSON.stringify(user)}`);

    return this.userService.update(params.id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params): Promise<UserDto> {
    Logger.log(`UserCtrl - delete ${params.id}`);

    return this.userService.delete(params.id);
  }

}