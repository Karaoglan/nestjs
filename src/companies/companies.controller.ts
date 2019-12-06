import { Controller, Post, Body, UseGuards, Logger, Get } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
export class CompaniesController {

  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createCompany(@Body() company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompCtrl - createComp ${JSON.stringify(company)}`);

    return this.companiesService.createCompany(company);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCompanies(): Promise<CompanyDto[] | []> {
    Logger.log(`CompCtrl - createComp`);
    return this.companiesService.getAll();
  }
}