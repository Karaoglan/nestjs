import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { parameterProviders } from './parameter.providers';
import { parameterItemProviders } from './parameterItem.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [ParametersController],
  providers: [
    ParametersService,
    ...parameterProviders,
    ...parameterItemProviders
  ],
  exports: [ParametersService],
})
export class ParametersModule {}
