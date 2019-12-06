import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
  
  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

  async createCompany(company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompanyServ - create ${JSON.stringify(company)}`);

    const createdCompany = new this.companyModel(company);
    return await createdCompany.save();
  }

  async getAll(): Promise<CompanyDto[] | []> {
    Logger.log(`CompanyServ - getAll`);
      
    return await this.companyModel.find().exec();
  }
}