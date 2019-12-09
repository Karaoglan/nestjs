import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginResDto } from './dto/user-login.res.dto';
import { User } from '../users/interfaces/user.interface';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(tckn: string, pass: string): Promise<User | null> {
    Logger.log(`AuthServ - validaUse ${tckn}, ${pass}`);

    const user = await this.usersService.findByTCKN(tckn);
    
    if (user) {
      const isValid = await bcrypt.compare(pass, user.password);
      return isValid ? user : null;
    }
    return null;
  }

  async login(user: User): Promise<UserLoginResDto> {
    Logger.log(`AuthService - changed - login ${JSON.stringify(user)}`);
    Logger.log(`tckn ${JSON.stringify(user.tckn)}`);

    const payload = { tckn: user.tckn, sub: user.email };
    return { token: this.jwtService.sign(payload)} as UserLoginResDto;
  }

  async signUp(user: UserSignupDto): Promise<UserSignupDto> {
    Logger.log(`AuthService - signUp ${JSON.stringify(user)}`);

    if (user.password !== user.confirmPassword) {
      // throw not match
      throw new HttpException('Password do not match', HttpStatus.BAD_REQUEST);
    }

    /*const foundUser = await this.usersService.findByTCKN(user.tckn);

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(user.password, 8);
    if (!hash) {
      throw new HttpException('could not crypt hash', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    Object.assign(foundUser, user);
    foundUser.status = Status[Status.ACTIVE];
    foundUser.password = hash;
    Logger.debug(`AuthServ - signUp assigned object ${JSON.stringify(foundUser)}`);

    return this.usersService.findByIDAndUpdate(foundUser.id, foundUser);*/
    return null;
  }
}
