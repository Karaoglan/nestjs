import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  tckn: string;
  name: string;
  surname: string;
  email: string;
  status: string;
  phone_number: string;
  company_id: string;
  password: string;
  eth_address: string;
}
