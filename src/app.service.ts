import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserDto } from './users/dto/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log(`AppSerice - getHello`);

    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return 'Hello World!';
  }
}
