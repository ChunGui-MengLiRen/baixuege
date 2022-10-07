const router = require("koa-router")();
const {
  sayList,
  sayAdd,
  sayDetail,
  sayUpdate,
  sayDel,
} = require("../controller/say");

router.prefix("/say");

router.post("/list", sayList);
router.post("/add", sayAdd);
router.get("/detail", sayDetail);
router.post("/update", sayUpdate);
router.get("/delete", sayDel);

module.exports = router;
