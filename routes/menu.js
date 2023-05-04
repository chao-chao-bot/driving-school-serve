var express = require('express');
var router = express.Router();
const menuHandler = require('../router_handler/menu')

//获得导航栏
router.get('/menu/list', menuHandler.getList)

module.exports = router;
