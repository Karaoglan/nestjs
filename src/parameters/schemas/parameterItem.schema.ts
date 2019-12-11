import * as mongoose from 'mongoose';

export const ParameterItemSchema = new mongoose.Schema({
  key: String,
  value : String,
  paramId : {type: mongoose.Schema.Types.ObjectId, ref: 'Parameter'},
});