import { Connection } from 'mongoose';
import { CompanySchema } from './schemas/company.schema';

export const companyProviders = [
  {
    provide: 'COMPANY',
    useFactory: (connection: Connection) => connection.model('Company', CompanySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];