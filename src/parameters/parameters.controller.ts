import { Controller, Post, Body, UseGuards, Logger, Get, Delete, Param, Put } from '@nestjs/common';
import { ParameterDto } from './dto/parameter.dto';
import { ParametersService } from './parameters.service';
import { AuthGuard } from '@nestjs/passport';
import { ParameterItemDto } from './dto/parameterItem.dto';

@Controller('parameters')
export class ParametersController {

  constructor(private readonly parametersService: ParametersService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<ParameterDto[] | []> {
    Logger.log(`ParamCtrl - get all Parameters`);
    return this.parametersService.findAll();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param() params): Promise<ParameterDto[] | []> {
    Logger.log(`ParamCtrl - get parameter by id: ${params.id}`);
    return this.parametersService.findById(params.id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() parameter: ParameterDto): Promise<ParameterDto> {
    Logger.log(`ParamCtrl - createParam ${JSON.stringify(parameter)}`);

    return this.parametersService.create(parameter);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post('/parameterItems')
  createItem(@Body() parameterItem: ParameterItemDto): Promise<ParameterItemDto> {
    Logger.log(`ParamCtrl - createParamItem ${JSON.stringify(parameterItem)}`);
  
    return this.parametersService.createItem(parameterItem);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get('/parameterItems/:id')
  findParamItemById(@Param() params): Promise<ParameterItemDto[] | []> {
    Logger.log(`ParamCtrl - get parameter item by id: ${params.id}`);
    return this.parametersService.findParamItemById(params.id);
  }
  
  //@UseGuards(AuthGuard('jwt'))
  @Delete('/parameterItems/:id')
  deleteParamItemById(@Param() params): Promise<ParameterItemDto> {
    Logger.log(`ParamCtrl - deleteParamItem ${params.id}`);

    return this.parametersService.deleteParamItemById(params.id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params): Promise<ParameterDto> {
    Logger.log(`ParamCtrl - deleteParam ${params.id}`);

    return this.parametersService.delete(params.id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() parameter: ParameterDto): Promise<ParameterDto> {
    Logger.log(`ParamCtrl - updateParam ${params.id} - ${JSON.stringify(parameter)}`);

    return this.parametersService.update(params.id, parameter);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put('/parameterItems/:id')
  updateParamItemById(@Param() params, @Body() parameterItem: ParameterItemDto): Promise<ParameterItemDto> {
    Logger.log(`ParamCtrl - updateParam ${params.id} - ${JSON.stringify(parameterItem)}`);

    return this.parametersService.updateParamItemById(params.id, parameterItem);
  }


}