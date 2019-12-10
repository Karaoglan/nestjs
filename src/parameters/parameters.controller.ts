import { Controller, Post, Body, UseGuards, Logger, Get, Delete, Param, Put } from '@nestjs/common';
import { ParameterDto } from './dto/parameter.dto';
import { ParametersService } from './parameters.service';
import { AuthGuard } from '@nestjs/passport';

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
    Logger.log(`CompCtrl - createComp ${JSON.stringify(parameter)}`);

    return this.parametersService.create(parameter);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params): Promise<ParameterDto> {
    Logger.log(`CompCtrl - deleteComp ${params.id}`);

    return this.parametersService.delete(params.id);
  }


}