import { Connection } from 'mongoose';
import { ParameterSchema } from './schemas/parameter.schema';
import { Constants } from '../../config';

export const parameterProviders = [
  {
    provide: Constants.PARAMETER_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Parameter', ParameterSchema),
    inject: [Constants.DB_PROVIDER],
  },
];
