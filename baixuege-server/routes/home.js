const router = require("koa-router")();
const {
  homeList,
  homeAdd,
  homeDetail,
  homeUpdate,
  homeDel,
  homeChangeStatus,
} = require("../controller/home");

router.prefix("/home");

router.post("/list", homeList);
router.post("/add", homeAdd);
router.get("/detail", homeDetail);
router.post("/update", homeUpdate);
router.get("/delete", homeDel);
router.get("/change", homeChangeStatus);

module.exports = router;
