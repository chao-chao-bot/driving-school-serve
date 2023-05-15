var express = require('express');
var router = express.Router();
const coachHandler = require('../router_handler/coach')
//获得导航栏
router.get('/coach/list', coachHandler.getCoachList)
router.post('/coach/edit', coachHandler.editCoach) 
router.post('/coach/delete', coachHandler.deleteCoach) 
router.post('/coach/add', coachHandler.addCoach) 
router.get('/coach/sum', coachHandler.getCoachSum) 
module.exports = router;
