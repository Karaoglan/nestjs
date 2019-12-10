import * as mongoose from 'mongoose';

export const ParameterSchema = new mongoose.Schema({
  data : [],
  name: {type : String, unique :true},
  
});