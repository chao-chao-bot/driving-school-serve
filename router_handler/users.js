const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  // 判断数据是否合法
  if (!userinfo.name || !userinfo.password || !userinfo.type) {
    return res.esend('用户名或密码不能为空！')
  }

  const userMap = {
    admin:"admin",
    coach:"coach",
    student:"student"
  }
  const userTable = userMap[userinfo.type]
  const sql = `select * from ${userTable} where name=?`
  db.query(sql, [userinfo.name], function (err, results) {
    if (err) {
      return res.esend(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.esend('用户名被占用，请更换其他用户名！')
    }
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    //注册用户
    const sql = `insert into ${userTable} set ?`
    db.query(sql, { name: userinfo.name, password: userinfo.password }, function (err, results) {
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
        name: userinfo.name,
        id: results.insertId,
      })
    })
  })
}




