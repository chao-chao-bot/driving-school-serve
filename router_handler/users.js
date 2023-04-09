const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userMap = {
  admin:"admin",
  coach:"coach",
  student:"student"
}
exports.regUser = (req, res) => {
  // 接收表单数据
  let {username:name,password,usertype:type} = req.body
  console.log(req.body);
  // 判断数据是否合法
  if (!name || !password || !type) {
    return res.esend('用户名或密码不能为空！')
  }
  
  const userSqlTable = userMap[type]
  const sql = `select * from ${userSqlTable} where name=?`
  db.query(sql, [name], function (err, results) {
    if (err) {
      return res.esend(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.esend('用户名被占用，请更换其他用户名！')
    }
    //注册用户
    //  password = bcrypt.hashSync(password, 10)
    const sql = `insert into ${userSqlTable} set ?`
    db.query(sql, { name, password }, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.esend(err)

      // SQL 语句执行成功，但影响行数不为 1
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
  const {username:name,password,usertype:type} = req.body
  // 判断数据是否合法
  if (!name || !password || !type) {
    return res.esend('用户名或密码不能为空！')
  }
  const userSqlTable = userMap[type]
  const sql = `select * from ${userSqlTable} where name=?`
  db.query(sql, name,  function (err, results) {
    if (err) return res.esend(err)
    if (results.length !== 1) return res.esend('登录失败,请检查身份、账号和密码')
    // const compareResult = bcrypt.compareSync(password,results[0].password)
    const compareResult = results[0].password === password
    console.log(compareResult,password);
    if (!compareResult) {
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
        id: results[0].id,
      })
    }, 1000)

  })
}




