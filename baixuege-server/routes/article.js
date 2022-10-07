const router = require("koa-router")();
const {
  articleList,
  articleAdd,
  articleDetail,
  articleUpdate,
  articleDel,
  articleChangeStatus,
} = require("../controller/article");

router.prefix("/article");

router.post("/list", articleList);
router.post("/add", articleAdd);
router.get("/detail", articleDetail);
router.post("/update", articleUpdate);
router.get("/delete", articleDel);
router.get("/change", articleChangeStatus);

module.exports = router;
