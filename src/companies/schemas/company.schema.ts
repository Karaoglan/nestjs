import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  member_code : Number,
  title: {type: String, required: true, min: 3, max: 100},
  member_type : String,
  lei_code : Number,
  trade_reg_office : String,
  trade_reg_no : Number,
  trade_reg_date : Date,
  tax_office : String,
  tax_no : Number,
  mernis_no : Number,
  bank : String,
  iban : Number,
  web_page : String,
  email : String,
  invoice_email : String,
  phone_number : Number,
  contact_person : String,
  address : String
});