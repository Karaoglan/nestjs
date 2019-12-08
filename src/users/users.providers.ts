import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { Constants } from '../../config';

export const usersProviders = [
  {
    provide: Constants.USER_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [Constants.DB_PROVIDER],
  },
];
