const router = require('koa-router')();
const {
  articleList,
  addArticle,
  articleDetail,
  updateArticle,
  delArticle,
} = require('../controller/article');

router.prefix('/article');

router.post('/list', articleList);
router.post('/add', addArticle);
router.get('/detail', articleDetail);
router.post('/update', updateArticle);
router.get('/delete', delArticle);

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response';
// });

module.exports = router;
