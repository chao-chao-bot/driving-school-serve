const { connectToDatabase } = require('../db/index')
//获取记录
exports.getRecordList = async (req, res) => {
  const db = await connectToDatabase()
  let { name } = req.query
  if (name) {
    const sql = `select r.* from student s  join record r  on s.student_id = r.student_id and s.name like "%${name}%";`
    const [rows] = await db.query(sql)
    return res.ssend(rows)
  }
  let sql = `select * from record `
  const [rows] = await db.query(sql)
  res.ssend(rows)
  await db.end();
}
//记录信息删除
exports.deleteRecord = async (req, res) => {
  const db = await connectToDatabase()
  const { record_id } = req.body
  const sql = `delete from record where record_id = ${record_id}`
  const [rows] = await db.query(sql)
  res.ssend([])
  await db.end()
}
//增加记录信息
exports.addRecord = async (req, res) => {
  const db = await connectToDatabase()
  const { studentArr, coach_id, start_date, subject, pass } = req.body
  for (let i = 0; i < studentArr.length; i++) {
      const sql = `insert into record set ?`
      const [rows] = await db.query(sql,[{ student_id:studentArr[i], coach_id, start_date, subject, pass }])
  }
  res.ssend([])
  await db.end()
}
