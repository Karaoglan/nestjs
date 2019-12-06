import { Controller, Post, Body, UseGuards, Logger, Get, Delete, Param, Put } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
export class CompaniesController {

  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompCtrl - createComp ${JSON.stringify(company)}`);

    return this.companiesService.create(company);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<CompanyDto[] | []> {
    Logger.log(`CompCtrl - createComp`);
    return this.companiesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/basic')
  findAllBasic(): Promise<CompanyDto[] | []> {
    Logger.log(`CompCtrl - basic Inf`);
    return this.companiesService.findAllBasic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params): Promise<CompanyDto> {
    Logger.log(`CompCtrl - deleteComp ${params.id}`);

    return this.companiesService.delete(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompCtrl - update ${params.id} - ${JSON.stringify(company)}`);

    return this.companiesService.update(params.id, company);
  }

}