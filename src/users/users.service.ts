import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Status } from './interfaces/user.status.enum';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: UserDto): Promise<UserDto> {
    Logger.log(`UserServ - create ${JSON.stringify(user)}`);

    const foundUser = await this.userModel.findOne({ 'tckn': user.tckn }).exec();

    if (foundUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel(user);
    createdUser.status = Status.PENDING;
    return await createdUser.save();
  }

  async findAll(): Promise<UserDto[] | []> {
    Logger.log(`UserServ - findAll`);
      
    return await this.userModel.find().populate('company_id').exec();
  }

  async findByTCKN(tckn: string): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findByTCKN ${tckn}`);

    return await this.userModel.findOne({ tckn }).exec();
  }

  async findByID(id: string): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findByID ${id}`);

    return await this.userModel.findById(id).populate('company_id').exec();
  }

  async delete(id: string): Promise<UserDto> {
    Logger.log(`UserServ - delete ${id}`);
    return await this.userModel.findByIdAndRemove(id).exec();
  }
  
  async update(id: string, user: UserDto): Promise<UserDto> {
    Logger.log(`UserServ - update ${id} - ${JSON.stringify(user)}`);
    return this.userModel.findByIdAndUpdate(id, user, { new: true });  
  }
}