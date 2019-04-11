import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  mobile: Number,
  breed: String,
});
