import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Status } from './interfaces/user.status.enum';
import { Constants } from '../../config';

@Injectable()
export class UsersService {

  constructor(@Inject(Constants.USER_MODEL_PROVIDER) private readonly userModel: Model<User>) {}

  async create(user: UserDto): Promise<UserDto> {
    Logger.log(`UserServ - create ${JSON.stringify(user)}`);

    const foundUser = await this.userModel.findOne({ tckn: user.tckn }).exec();

    if (foundUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel(user);
    createdUser.status = Status[Status.PENDING];
    return await createdUser.save();
  }

  async findAll(): Promise<UserDto[] | []> {
    Logger.log(`UserServ - findAll`);
    return await this.userModel.find().populate('company_id').exec();
  }

  async findByTCKN(tckn: string): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findByTCKN ${tckn}`);

    return await this.userModel.findOne({ 'tckn': tckn }).exec();
  }

  async findByID(id: string): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findByID ${id}`);

    return await this.userModel.findById(id).populate('company_id').exec();
  }

  async findByIDAndUpdate(id: string, user: UserDto): Promise<UserDto | undefined> {
    Logger.log(`UserServ - findByID ${id} - ${JSON.stringify(user)}`);

    return await this.userModel.findByIdAndUpdate(id, user).populate('company_id').exec();
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
