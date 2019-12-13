import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ParameterDto } from './dto/parameter.dto';
import { Parameter } from './interfaces/parameter.interface';
import { ParameterItem } from './interfaces/parameterItem.interface';
import { Constants } from '../../config';
import { ParameterItemDto } from './dto/parameterItem.dto';

@Injectable()
export class ParametersService {

  constructor(@Inject(Constants.PARAMETER_MODEL_PROVIDER) private readonly parameterModel: Model<Parameter>,
              @Inject(Constants.PARAMETER_ITEM_MODEL_PROVIDER) private readonly parameterItemModel: Model<ParameterItem>) {}

  async findAll(): Promise<ParameterDto[] | []> {
    Logger.log(`ParametersService - findAll`);

    return await this.parameterModel.find().exec();
  }

  async findById(id: string): Promise<ParameterDto[] | []> {
    Logger.log(`ParametersService - findById`);

    return await this.parameterModel.findById(id).exec();;
  }

  async findParamItemById(id: string): Promise<ParameterItemDto[] | []> {
    Logger.log(`ParametersService - findById`);

    return await this.parameterItemModel.find({ 'paramId': id }).exec();
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

  async createItem(parameterItem: ParameterItemDto): Promise<ParameterItemDto> {
    Logger.log(`ParametersService - create ${JSON.stringify(parameterItem)}`);

    const foundParameter = await this.parameterModel.findById(parameterItem.paramId).exec();
    const foundParameterKey = await this.parameterItemModel.findOne({ 'key': parameterItem.key }).exec();

    if (!foundParameter || foundParameterKey ) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const createdParameter = new this.parameterItemModel(parameterItem);
    return await createdParameter.save();
  }

  async delete(id: string): Promise<ParameterDto> {
    Logger.log(`ParametersService - delete ${id}`);
    return await this.parameterModel.findByIdAndRemove(id).exec();
  }

  async deleteParamItemById(id: string): Promise<ParameterItemDto> {
    Logger.log(`ParametersService - delete ${id}`);
    return await this.parameterItemModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, parameter: ParameterDto): Promise<ParameterDto> {
    Logger.log(`ParametersService - update ${id} - ${JSON.stringify(parameter)}`);
    return this.parameterModel.findByIdAndUpdate(id, parameter, { new: true });
  }

  async updateParamItemById(id: string, parameterItem: ParameterItemDto): Promise<ParameterItemDto> {
    Logger.log(`ParametersService - updateParamItem ${id} - ${JSON.stringify(parameterItem)}`);
    return this.parameterItemModel.findByIdAndUpdate(id, parameterItem, { new: true });
  }

}
