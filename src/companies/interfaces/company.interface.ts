import { Document } from 'mongoose';

export interface Company extends Document {
  tckn: string;
  name: string;
  surname: string;
  email: string;
  status: string,
  phone_number: string;
  company_id: string;
  password: string;
  eth_address: string;
}
