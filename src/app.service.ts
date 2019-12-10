import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log(`AppService - getHello`);

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return 'Hello World!';
  }
}
