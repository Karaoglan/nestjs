import { Document } from 'mongoose';
import { Parameter} from './parameter.interface';

export interface ParameterItem extends Document {
  key: string,
  value: string,
  paramId : Parameter
}
