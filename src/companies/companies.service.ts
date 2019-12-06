import { Injectable, Logger } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  async createCompany(company: CompanyDto): Promise<CompanyDto> {
    Logger.log(`CompanyServ - create ${JSON.stringify(company)}`);

    return new Promise(function(resolve, reject) {
      return resolve(company);
   })
  }

  async getAll(): Promise<CompanyDto[] | []> {
    Logger.log(`CompanyServ - getAll`);
    
    let companies: CompanyDto[] = [
      {
        title: 'company1'
      },
      {
        title: 'company2'
      }
    ]
    Logger.log(`CompServ - get all returning companies ${companies}`);
    
    return companies;
  }
}