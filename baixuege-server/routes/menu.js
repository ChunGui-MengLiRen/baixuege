const router = require("koa-router")();
const {
  menuList,
  menuAdd,
  menuDetail,
  menuUpdate,
  menuDel,
  menuChangeStatus,
} = require("../controller/menu");

router.prefix("/menu");

router.post("/list", menuList);
router.post("/add", menuAdd);
router.get("/detail", menuDetail);
router.post("/update", menuUpdate);
router.get("/delete", menuDel);
router.post("/change", menuChangeStatus);

module.exports = router;
