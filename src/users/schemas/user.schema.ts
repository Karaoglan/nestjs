import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  tckn : { type : String, unique: true },
  name: { type: String, required: true, max: 100 },
  surname : { type: String, required: true, max: 100 },
  email : { type: String, required: true, max: 100 },
  status: String,
  phone_number : { type: String },
  company_id : { type: mongoose.Schema.ObjectId, ref: 'Company' },
  password : String,
  eth_address : {type : String, unique: true, sparse: true, index: true},
});
