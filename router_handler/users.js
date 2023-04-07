const db = require('../db/index')
exports.regUser = (req,res)=>{
  console.log(req.body);
  const sql = 'select * from admin'
  db.query(sql,(err,result)=>{
    return res.send(result)
  })
  
}