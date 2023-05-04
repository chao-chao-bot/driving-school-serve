const { connectToDatabase } = require('../db/index')
//获取课程列表
exports.getCourseList = async (req, res) => {
  const { name } = req.query
  console.log('name====',name);
  const db = await connectToDatabase()
  if(name){
    const coachIdData = []
    const sql = `select * from coach where name like "%${name}%"`
    const[likeData] = await db.query(sql)
    likeData.forEach((item)=>{
      coachIdData.push(item.coach_id)
    })
    const sqlFromCourse = `select * from course where coach_id = ?`
    const resData = []
    for(let i = 0;i < coachIdData.length;i ++ ){
      const [rows] =  await db.query(sqlFromCourse,[coachIdData[i]])
      const mapData = rows.map(item => {
        return { ...item, studentArr: item.studentArr.split(',').map(Number) }
      })
      resData.push(...mapData)
    }
    return res.ssend(resData)
  }
  let sql = `select * from course`
  const [rows] = await db.query(sql)
  if (rows.length > 0) {
    const mapData = rows.map(item => {
      return { ...item, studentArr: item.studentArr.split(',').map(Number) }
    })
    res.ssend(mapData)
  } else {
    res.ssend([])
  }
  await db.end();
}
// 教练信息修改
exports.editCourse = async (req, res) => {
  const db = await connectToDatabase()
  const { course_id, ...course } = req.body
  const editCourse = { ...course, studentArr: course.studentArr.join(',') }
  const sql = `update course set ? where course_id = ${course_id}`
  const [data] = await db.query(sql, [editCourse])
  const searchSql = `select * from course`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end();
}
//教练信息删除
exports.deleteCourse = async (req, res) => {
  const db = await connectToDatabase()
  const { course_id } = req.body
  const sql = `delete from course where course_id = ${course_id}`
  const [rows] = await db.query(sql)
  console.log(rows);
  res.ssend([])
  await db.end()
}
//增加课程
exports.addCourse = async (req, res) => {
  const db = await connectToDatabase()
  const { course_id, ...course } = req.body
  const addCourse = { ...course, studentArr: course.studentArr.join(',') }
  const sql = `insert into course set ?`
  const [rows1] = await db.query(sql, [addCourse])
  console.log('rows1====', rows1);
  const searchSql = `select * from course`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end()
}
