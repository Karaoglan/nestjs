import { Connection } from 'mongoose';
import { CompanySchema } from './schemas/company.schema';
import { Constants } from '../../config';

export const companyProviders = [
  {
    provide: Constants.COMPANY_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('Company', CompanySchema),
    inject: [Constants.DB_PROVIDER],
  },
];
