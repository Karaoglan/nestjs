import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ParametersModule } from './parameters/parameters.module';
@Module({
  imports: [
    AuthModule, UsersModule, CompaniesModule, ParametersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
