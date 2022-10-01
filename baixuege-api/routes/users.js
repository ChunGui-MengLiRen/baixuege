const router = require('koa-router')();
const { userLogin } = require('../controller/users');

router.prefix('/users');

router.post('/login', userLogin);

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response';
// });

module.exports = router;
