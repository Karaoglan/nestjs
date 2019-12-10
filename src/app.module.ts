import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ParametersModule } from './parameters/parameters.module';

@Module({
  imports: [AuthModule, UsersModule, CompaniesModule, ParametersModule],
  providers: [AppService],
})
export class AppModule {}
