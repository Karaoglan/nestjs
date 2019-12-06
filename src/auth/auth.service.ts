import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(tckn: string, pass: string): Promise<UserLoginDto | null> {
    Logger.log(`AuthServ - validaUse ${tckn}, ${pass}`);

    const user = await this.usersService.findByTCKN(tckn);
    if (user && user.password === pass) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: UserLoginDto): Promise<UserLoginDto> {    
    Logger.log(`AuthServ - login ${JSON.stringify(user)}`);

    const payload = { password: user.password, tckn: user.tckn };
    return { ...user,
      token: this.jwtService.sign(payload),
    };
  }
  
  async signUp(user: CreateUserDto): Promise<UserDto> {    
    Logger.log(`AuthServ - signUp ${JSON.stringify(user)}`);

    // use bcyrpt

    if (user.password !== user.confirmPassword) {
      // throw not match
      throw new HttpException('Bad Req', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.usersService.findByTCKN(user.tckn);

    if (foundUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    let userDto: UserDto;
    Object.assign(userDto, user)

    return userDto;
  }


}
