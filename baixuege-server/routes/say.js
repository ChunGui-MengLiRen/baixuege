const router = require('koa-router')();
const {
  sayList,
  addSay,
  sayDetail,
  updateSay,
  delSay,
} = require('../controller/say');

router.prefix('/say');

router.post('/list', sayList);
router.post('/add', addSay);
router.get('/detail', sayDetail);
router.post('/update', updateSay);
router.get('/delete', delSay);

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response';
// });

module.exports = router;
