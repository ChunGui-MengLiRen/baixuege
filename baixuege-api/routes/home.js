const router = require('koa-router')();
const {
  homeList,
  addHome,
  homeDetail,
  updateHome,
  delHome,
  changeStatus,
} = require('../controller/home');

router.prefix('/home');

router.post('/list', homeList);
router.post('/add', addHome);
router.get('/detail', homeDetail);
router.post('/update', updateHome);
router.get('/delete', delHome);
router.get('/change', changeStatus);

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response';
// });

module.exports = router;
