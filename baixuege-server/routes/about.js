const router = require('koa-router')();
const { aboutDetail, updateAbout } = require('../controller/about');

router.prefix('/about');

router.get('/detail', aboutDetail);
router.post('/update', updateAbout);

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response';
// });

module.exports = router;
