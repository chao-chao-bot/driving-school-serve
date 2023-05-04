var express = require('express');
var router = express.Router();
const courseHandler = require('../router_handler/course')
//获得导航栏
router.get('/course/list', courseHandler.getCourseList)
router.post('/course/edit', courseHandler.editCourse) 
router.post('/course/delete', courseHandler.deleteCourse) 
router.post('/course/add', courseHandler.addCourse) 
module.exports = router;
