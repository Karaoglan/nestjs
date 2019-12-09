import { Document } from 'mongoose';

export interface User extends Document {
  id?: string;
  tckn: string;
  name: string;
  surname: string;
  email: string;
  status: string;
  phoneNumber: string;
  companyId: string;
  password?: string;
  ethAddress?: string;
  token?: string;
}
