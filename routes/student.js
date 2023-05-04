var express = require('express');
var router = express.Router();
const studentHandler = require('../router_handler/student')
//获得导航栏
router.get('/student/list', studentHandler.getStudentList)
router.post('/student/edit', studentHandler.editStudent) 
router.post('/student/delete', studentHandler.deleteStudent) 
router.post('/student/add', studentHandler.addStudent) 
module.exports = router;
