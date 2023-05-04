const {connectToDatabase} = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = async (req, res) => {
  // 接收表单数据
  let { name, password } = req.body
  const db =  await connectToDatabase()
  if (!name || !password) {
    return res.esend('用户名或密码不能为空！')
  }
  const sql = `select * from users where name=?`
  const [rows] = await db.query(sql, [name]);
  if (rows.length > 0) {
    return res.esend('用户名被占用，请更换其他用户名！')
  }
  const insertSql = `insert into users set ?`
  const [rows2] = await db.query(insertSql, [{ name, password }]);
  const user = { ...rows2[0], id: rows.insertId, password: '' }
  const tokenStr = jwt.sign(user, config.jwtSecretKey, {
    expiresIn: '10h',
  })
  res.ssend({
    access_token: 'Bearer ' + tokenStr,
    name,
    id: rows.insertId,
  })
  await db.end();
}



exports.login = async (req,res) => { 
  const db = await connectToDatabase()
  const { name, password } = req.body
   // 判断数据是否合法
   if (!name || !password) {
    return res.esend('用户名或密码不能为空！')
  }
  const sql = `select * from users where name=?`
  const [rows] = await db.query(sql, [name]);
  console.log("row====",rows,rows[0].password,password);
  if (rows.length !== 1) return res.esend('登录失败,请检查身份、账号和密码')
  if (rows[0].password !== password) {
    return res.esend('登录失败,请检查账号和密码')
  }
  const user = { ...rows[0], password: '' }
  const tokenStr = jwt.sign(user, config.jwtSecretKey, {
    expiresIn: '40h',
  })
    setTimeout(() => {
      res.ssend({
        access_token: 'Bearer ' + tokenStr,
        name: rows[0].name,
        id: rows[0].user_id,
      })
    }, 1000)
  await db.end();
}