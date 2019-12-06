import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './schemas/company.schema';
import { companyProviders } from './company.providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    ...companyProviders,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}