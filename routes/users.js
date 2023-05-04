var express = require('express');
var router = express.Router();
const userHandler = require('../router_handler/users')

// 注册新用户
router.post('/auth/register', userHandler.regUser)
router.post('/auth/login', userHandler.login)

module.exports = router;
