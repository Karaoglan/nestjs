import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { Constants } from '../config';
@Module({
  imports: [
    AuthModule, UsersModule, CompaniesModule,
    MongooseModule.forRoot(Constants.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
