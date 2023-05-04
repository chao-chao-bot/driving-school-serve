// 导入 express 模块
const express = require('express')
const cors = require('cors')

const config = require('./config')
const {
  userRouter,
  menuRouter,
  studentRouter,
  coachHandler,
  courseHandler,
  examHandler
} = require('./routes')

// 解析 token 的中间件
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const app = express()
const server = require('http').Server(app)
app.use(cors())

app.use((req, res, next) => {
  // 0表示失败 1表示成功
  res.esend = function (err, code = 0) {
    res.send({
      code,
      desc: err instanceof Error ? err.msg : err
    })
  }
  res.ssend = function (data, code = 200) {
    res.send({
      code,
      desc: 'success',
      data: data || {}
    })
  }
  next()
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/driving\/auth\//] }))
// 错误中间件
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') return res.esend('身份认证失败！')
  next()
}) 

app.use('/api/driving', userRouter)
app.use('/api/driving', menuRouter)
app.use('/api/driving', studentRouter)  
app.use('/api/driving', coachHandler)  
app.use('/api/driving', courseHandler)  
app.use('/api/driving', examHandler)  

server.listen(3000, function () {
  console.log('api server running at http://127.0.0.1:3000')
})
