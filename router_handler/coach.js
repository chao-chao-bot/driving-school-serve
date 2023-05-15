const { connectToDatabase } = require('../db/index')

exports.getCoachList = async (req, res) => {
  const db = await connectToDatabase()
  let { name } = req.query
  let sql = `select * from coach `
  if (name) {
    sql += `where name like "%${name}%" `
  }
  const [rows] = await db.query(sql, [name])
  res.ssend(rows)
  await db.end();
}
// 教练信息修改
exports.editCoach = async (req, res) => {
  const db = await connectToDatabase()
  const { coach_id, ...coach } = req.body
  const sql = `update coach set ? where coach_id = ${coach_id}`
  const [data] = await db.query(sql, [coach])
  const searchSql = `select * from Coach`
  const [rows] = await db.query(searchSql)
  res.esend(rows)
  await db.end();
}
//教练信息删除
exports.deleteCoach = async (req, res) => {
  const db = await connectToDatabase()
  const { coach_id } = req.body
  const sql = `delete from coach where coach_id = ${coach_id}`
  const [rows] = await db.query(sql)
  console.log(rows);
  res.ssend([])
  await db.end()
}
//增加学生信息
exports.addCoach = async (req, res) => {
  const db = await connectToDatabase()
  const Coach = req.body
  const sql = `insert into Coach set ?`
  const [rows] = await db.query(sql, [Coach])
  console.log(rows);
  res.ssend([])
  await db.end()
}

//获取教练数目
exports.getCoachSum = async (req, res) => { 
  const db = await connectToDatabase()
  const sql = `select count(*) as sum from student;`
  const [rows] = await db.query(sql)
  res.ssend(rows[0])
  await db.end()
}