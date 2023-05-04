const { connectToDatabase } = require('../db/index')
//获取课程列表
exports.getCourseList = async (req, res) => {
  const db = await connectToDatabase()
  let { name } = req.query
  let sql = `select * from course`
  if (name) {
    sql += `where name like "%${name}%" `
  }  
  const [rows] = await db.query(sql, [name])
  if(rows.length > 0 ){
    let resObj  = rows[0] 
    resObj.studentArr = resObj.studentArr.split(',').map(Number);  
    res.ssend([resObj])
  }else{
    res.ssend([])
  }
  await db.end();
}
// 教练信息修改
exports.editCourse = async (req, res) => {
  const db = await connectToDatabase()
  const { course_id, ...course } = req.body
  const editCourse = {...course,studentArr:course.studentArr.join(',')}
  const sql = `update course set ? where course_id = ${course_id}`
  const [data] = await db.query(sql, [editCourse])
  const searchSql = `select * from course`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end();
}
//教练信息删除
exports.deleteCourse  = async (req,res) => {
  const db = await connectToDatabase()
  const {course_id} = req.body
  const sql = `delete from course where course_id = ${course_id}`
  const [rows] = await db.query(sql)
  console.log(rows);
  res.ssend([])
  await db.end()
 }
//增加课程
exports.addCourse  = async (req,res) => {
  const db = await connectToDatabase()
  const { course_id, ...course } = req.body
  const addCourse = {...course,studentArr:course.studentArr.join(',')}
  const sql = `insert into course set ?`
   await db.query(sql,[addCourse])
  const searchSql = `select * from course`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end()
 }
