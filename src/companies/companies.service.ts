import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
  
  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) {}

  async create(company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompaniesService - create ${JSON.stringify(company)}`);

    const foundCompany = await this.companyModel.findOne({ 'member_code': company.member_code }).exec();

    if (foundCompany) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const createdCompany = new this.companyModel(company);
    return await createdCompany.save();
  }

  async findAll(): Promise<CompanyDto[] | []> {
    Logger.log(`CompaniesService - findAll`);
      
    return await this.companyModel.find().exec();
  }

  async findAllBasic(): Promise<CompanyDto[] | []> {
    Logger.log(`CompaniesService - findAllBasic`);
      
    return await this.companyModel.find({}, 'title').exec();
  }

  async delete(id: string): Promise<CompanyDto> {
    Logger.log(`CompaniesService - delete ${id}`);
    return await this.companyModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompaniesService - update ${id} - ${JSON.stringify(company)}`);
    return this.companyModel.findByIdAndUpdate(id, company, { new: true });  
  }
}