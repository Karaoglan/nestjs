import * as mongoose from 'mongoose';

import { Constants } from '../../config';

export const databaseProviders = [
  {
    provide: Constants.DB_PROVIDER,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(Constants.MONGODB_URL),
  },
];
