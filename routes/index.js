const userRouter = require('./users')
const menuRouter = require('./menu')
const studentRouter = require('./student')
const coachHandler  = require('./coach') 
const courseHandler = require('./course')
module.exports = {
  userRouter,
  menuRouter,
  studentRouter,
  coachHandler,
  courseHandler
}
