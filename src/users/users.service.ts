import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async createUser(user: UserDto): Promise<UserDto> {
    Logger.log(`UserServ - createUser ${JSON.stringify(user)}`);

    return new Promise(function(resolve, reject) {
      return resolve(user);
   })
  }

  async findOne(tckn: string): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findOne ${tckn}`);
    let user: UserDto = {
      password: '1',
      tckn: '1',
      email: 'burak@dot.com'
    }
    Logger.log(`UserServ - findOne returning user ${user}`);

    return user;
  }
}