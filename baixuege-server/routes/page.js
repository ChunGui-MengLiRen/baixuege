const router = require("koa-router")();
const {
  pageHomeDetail,
  pageArticleList,
  pageArticleDetail,
  pageSayList,
  pageAboutDetail,
  pageDict,
} = require("../controller/page");

router.prefix("/page");

router.get("/home", pageHomeDetail);
router.post("/articleList", pageArticleList);
router.get("/articleDetail", pageArticleDetail);
router.post("/sayList", pageSayList);
router.get("/aboutDetail", pageAboutDetail);
router.get("/dict", pageDict);

module.exports = router;
