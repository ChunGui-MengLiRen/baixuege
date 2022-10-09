const router = require("koa-router")();
const {
  tagsList,
  tagsAdd,
  tagsDetail,
  tagsUpdate,
  tagsDel,
  tagsListNoPage,
} = require("../controller/tags");

router.prefix("/tags");

router.post("/list", tagsList);
router.get("/listAll", tagsListNoPage);
router.post("/add", tagsAdd);
router.get("/detail", tagsDetail);
router.post("/update", tagsUpdate);
router.get("/delete", tagsDel);

module.exports = router;
