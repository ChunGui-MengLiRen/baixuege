const router = require('koa-router')();
const { userLogin } = require('../controller/users');

router.prefix('/users');

router.post('/login', userLogin);

module.exports = router;
