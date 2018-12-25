const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/foodapp'

exports.connect = () => {
  return new Promise((resolve, reject) => {
    // 连接数据库
    mongoose.connect(
      db,
      { useNewUrlParser: true }
    )

    let maxConnectTimes = 0

    mongoose.connection.on('disconnected', err => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(
          db,
          { useNewUrlParser: true }
        )
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(
          db,
          { useNewUrlParser: true }
        )
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    // 链接打开的时
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
  })
}
