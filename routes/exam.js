var express = require('express');
var router = express.Router();
const examHandler = require('../router_handler/exam')
//获得导航栏
router.get('/exam/list', examHandler.getExamList)
router.post('/exam/edit', examHandler.editExam) 
router.post('/exam/delete', examHandler.deleteExam) 
router.post('/exam/add', examHandler.addExam) 
module.exports = router;
