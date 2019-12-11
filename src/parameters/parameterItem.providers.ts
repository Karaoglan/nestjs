import { Connection } from 'mongoose';
import { Constants } from '../../config';
import { ParameterItemSchema } from './schemas/parameterItem.schema';

export const parameterItemProviders = [
  {
    provide: Constants.PARAMETER_ITEM_MODEL_PROVIDER,
    useFactory: (connection: Connection) => connection.model('ParameterItem', ParameterItemSchema),
    inject: [Constants.DB_PROVIDER],
  },
];
