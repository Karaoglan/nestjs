import { Document } from "mongoose";

export interface User extends Document {
  tckn: String,
  name: String,
  surname: String,
  email: String,
  status: String,
  phone_number: String,
  company_id: String,
  password: String,
  eth_address: String,
}