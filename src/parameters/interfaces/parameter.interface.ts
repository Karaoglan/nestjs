import { Document } from 'mongoose';

export interface Parameter extends Document {
  name: string,
}
