import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { Status } from '../users/interfaces/user.status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(tckn: string, pass: string): Promise<UserLoginDto | null> {
    Logger.log(`AuthServ - validaUse ${tckn}, ${pass}`);

    const user = await this.usersService.findByTCKN(tckn);

    if (user) {
      const isValid = await bcrypt.compare(pass, user.password);
      const userLogin: UserLoginDto = null;
      Object.assign(userLogin, user);
      return isValid ? userLogin : null;
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

  async signUp(user: UserSignupDto): Promise<UserSignupDto> {
    Logger.log(`AuthServ - signUp ${JSON.stringify(user)}`);

    if (user.password !== user.confirmPassword) {
      // throw not match
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.usersService.findByTCKN(user.tckn);

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(user.password, 8);
    if (!hash) {
      throw new HttpException('could not crypt hash', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    Object.assign(foundUser, user);
    Logger.debug(`AuthServ - signUp assigned object ${JSON.stringify(foundUser)}`);

    return this.usersService.findByIDAndUpdate(foundUser.id, {...foundUser, status: Status.ACTIVE.toString()});
  }
}
