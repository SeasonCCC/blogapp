const Koa = require('koa')
const Router = require('koa-router')
const { connect } = require('./connect')
const { getModel } = require('./models')

const app = new Koa()
const router = new Router()

const getTableArr = ['users', 'news', 'tips', 'exposure']
const modelObj = {}
connect()

getTableArr.forEach((item, index) => {
  const modelName = item.substring(0, 1).toUpperCase() + item.substring(1)
  modelObj[modelName] = getModel(item)

  // get lists interface
  router.get('/' + modelName, async ctx => {
    await modelObj[modelName].find({}, (err, doc) => {
      if (err) {
        console.log(err)
      }
      ctx.body = {
        statusCode: 200,
        msg: '获取成功',
        data: doc
      }
    })
  })
})

// const testUser = new modelObj.Users({
//   username: 'test',
//   password: '123456789',
//   type: 'normal',
//   status: '0'
// })

// testUser.save().then(() => console.log('meow'))

app.use(router.routes())
app.listen(3000)
