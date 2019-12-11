import * as mongoose from 'mongoose';

export const ParameterSchema = new mongoose.Schema({
  name: {type : String, unique :true},
});