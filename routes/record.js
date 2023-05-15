var express = require('express');
var router = express.Router();
const recordHandler = require('../router_handler/record.js')
//获得导航栏
router.get('/record/list', recordHandler.getRecordList)
router.post('/record/delete', recordHandler.deleteRecord) 
router.post('/record/add', recordHandler.addRecord) 
module.exports = router;
