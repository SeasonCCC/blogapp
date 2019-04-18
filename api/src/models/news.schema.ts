import * as mongoose from 'mongoose';

export const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  abstract: String,
  star: String,
  image: String,
  create_time: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});
