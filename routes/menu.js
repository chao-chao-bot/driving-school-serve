var express = require('express');
var router = express.Router();
const menuandler = require('../router_handler/menu')

//获得导航栏
router.get('/menu/list', menuandler.getList)

module.exports = router;
