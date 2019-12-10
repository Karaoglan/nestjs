import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ParameterDto } from './dto/parameter.dto';
import { Parameter } from './interfaces/parameter.interface';
import { Constants } from '../../config';

@Injectable()
export class ParametersService {

  constructor(@Inject(Constants.PARAMETER_MODEL_PROVIDER) private readonly parameterModel: Model<Parameter>) {}

  async findAll(): Promise<ParameterDto[] | []> {
    Logger.log(`ParametersService - findAll`);

    return await this.parameterModel.find().exec();
  }

  async findById(id: string): Promise<ParameterDto[] | []> {
    Logger.log(`ParametersService - findById`);

    return await this.parameterModel.findById(id).exec();;
  }

  async create(parameter: ParameterDto): Promise<ParameterDto> {
    Logger.log(`ParametersService - create ${JSON.stringify(parameter)}`);

    const foundParameter = await this.parameterModel.findOne({ 'name': parameter.name }).exec();

    if (foundParameter) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const createdParameter = new this.parameterModel(parameter);
    return await createdParameter.save();
  }

  async delete(id: string): Promise<ParameterDto> {
    Logger.log(`ParametersService - delete ${id}`);
    return await this.parameterModel.findByIdAndRemove(id).exec();
  }

}
