const router = require('koa-router')();
const {
  articleList,
  addArticle,
  articleDetail,
  updateArticle,
  delArticle,
  changeStatus,
} = require('../controller/article');

router.prefix('/article');

router.post('/list', articleList);
router.post('/add', addArticle);
router.get('/detail', articleDetail);
router.post('/update', updateArticle);
router.get('/delete', delArticle);
router.get('/change', changeStatus);

module.exports = router;
