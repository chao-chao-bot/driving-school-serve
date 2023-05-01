const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.regUser = (req, res) => {
  // 接收表单数据
  let {name,password} = req.body
  if (!name || !password ) {
    return res.esend('用户名或密码不能为空！')
  }
  const sql = `select * from users where name=?`
  db.query(sql, [name], function (err, results) {
    if (err) {
      return res.esend(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.esend('用户名被占用，请更换其他用户名！')
    }
    const sql = `insert into users set ?`
    db.query(sql, { name, password }, function (err, results) {
      if (err) return res.esend(err)
      if (results.affectedRows !== 1) {
        return res.esend('注册用户失败，请稍后再试！')
      }
      const user = { ...results[0], id: results.insertId, password: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: '10h',
      })
      res.ssend({
        token: 'Bearer ' + tokenStr,
        name,
        id: results.insertId,
      })
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const {name,password} = req.body
  // 判断数据是否合法
  if (!name || !password ) {
    return res.esend('用户名或密码不能为空！')
  }
  const sql = `select * from users where name=?`
  db.query(sql, name,  function (err, results) {
    if (err) return res.esend(err)
    if (results.length !== 1) return res.esend('登录失败,请检查身份、账号和密码')
    if (!results[0].password === password) {
      return res.esend('登录失败,请检查账号和密码')
    }

    const user = { ...results[0], password: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '40h',
    })
    setTimeout(() => {
      res.ssend({
        token: 'Bearer ' + tokenStr,
        name: results[0].name,
        id: results[0].user_id,
      })
    }, 1000)
  })
}




