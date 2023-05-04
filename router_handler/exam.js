const { connectToDatabase } = require('../db/index')
//获取考试表
exports.getExamList = async (req, res) => {
  const { name } = req.query
  const db = await connectToDatabase()
  if(name){
    const coachIdData = []
    const sql = `select * from coach where name like "%${name}%"`
    const[likeData] = await db.query(sql)
    console.log('likeData====',likeData);
    likeData.forEach((item)=>{
      coachIdData.push(item.coach_id)
    })
    const sqlFromExam = `select * from exam where coach_id = ?`
    const resData = []
    for(let i = 0;i < coachIdData.length;i ++ ){
      const [rows] =  await db.query(sqlFromExam,[coachIdData[i]])
      const mapData = rows.map(item => {
        return { ...item, studentArr: item.studentArr.split(',').map(Number) }
      })
      resData.push(...mapData)
    }
    return res.ssend(resData)
  }
  let sql = `select * from exam`
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
// 考试信息修改
exports.editExam = async (req, res) => {
  const db = await connectToDatabase()
  const { exam_id, ...exam } = req.body
  const editExam = { ...exam, studentArr: exam.studentArr.join(',') }
  const sql = `update exam set ? where exam_id = ${exam_id}`
  const [data] = await db.query(sql, [editExam])
  const searchSql = `select * from exam`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end();
}
//考试信息删除
exports.deleteExam = async (req, res) => {
  const db = await connectToDatabase()
  const { exam_id } = req.body
  const sql = `delete from exam where exam_id = ${exam_id}`
  const [rows] = await db.query(sql)
  res.ssend([])
  await db.end()
}
//增加考试
exports.addExam = async (req, res) => {
  const db = await connectToDatabase()
  const { exam_id, ...exam } = req.body
  const addExam = { ...exam, studentArr: exam.studentArr.join(',') }
  const sql = `insert into exam set ?`
  const [rows1] = await db.query(sql, [addExam])
  const searchSql = `select * from exam`
  const [rows] = await db.query(searchSql)
  res.ssend(rows)
  await db.end()
}
