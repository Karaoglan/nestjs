import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { companyProviders } from './company.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    ...companyProviders,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
