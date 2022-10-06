const router = require('koa-router')();
const {
  homePageDetail,
  pageArticleList,
  pageArticleDetail,
  pageSayList,
  pageAboutDetail,
} = require('../controller/page');

router.prefix('/page');

router.get('/home', homePageDetail);
router.post('/articleList', pageArticleList);
router.get('/articleDetail', pageArticleDetail);
router.post('/sayList', pageSayList);
router.get('/aboutDetail', pageAboutDetail);

module.exports = router;
