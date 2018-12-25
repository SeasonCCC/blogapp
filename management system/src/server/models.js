const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.getModel = table => {
  let schema = {}
  switch (table) {
    case 'users':
      schema = new Schema({
        username: String,
        password: String,
        type: String,
        status: Number
      })
      break

    case 'news':
      schema = new Schema({
        username: String,
        password: String,
        type: String,
        status: Number
      })
      break

    case 'tips':
      schema = new Schema({
        username: String,
        password: String,
        type: String,
        status: Number
      })
      break

    case 'exposure':
      schema = new Schema({
        username: String,
        password: String,
        type: String,
        status: Number
      })
      break

    default:
      break
  }

  let models = mongoose.model(
    table.substring(0, 1).toUpperCase() + table.substring(1),
    schema,
    table
  )
  return models
}
