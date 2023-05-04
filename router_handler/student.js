const { connectToDatabase } = require('../db/index')

exports.getStudentList = async (req, res) => {
  const db = await connectToDatabase()
  let { name } = req.query
  let sql = `select * from student `
  if (name) {
    sql += `where name like "%${name}%" `
  }
  const [rows] = await db.query(sql, [name])
  res.ssend(rows)
  await db.end();
}
// 学生信息修改
exports.editStudent = async (req, res) => {
  const db = await connectToDatabase()
  const { student_id, ...student } = req.body
  const sql = `update student set ? where student_id = ${student_id}`
  const [data] = await db.query(sql, [student])
  const searchSql = `select * from student`
  const [rows] = await db.query(searchSql)
  res.esend(rows)
  await db.end();
}
//学生信息删除
exports.deleteStudent  = async (req,res) => {
  const db = await connectToDatabase()
  const {student_id} = req.body
  const sql = `delete from student where student_id = ${student_id}`
  const [rows] = await db.query(sql)
  console.log(rows);
  res.ssend([])
  await db.end()
 }
//增加学生信息
exports.addStudent  = async (req,res) => {
  const db = await connectToDatabase()
  const student = req.body
  const sql = `insert into student set ?`
  const [rows] = await db.query(sql,[student])
  console.log(rows);
  res.ssend([])
  await db.end()
 }
