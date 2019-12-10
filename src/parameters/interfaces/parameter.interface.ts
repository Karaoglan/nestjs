import { Document } from 'mongoose';

export interface Parameter extends Document {
  data: [],
  name: string
}
