const router = require('koa-router')();
const {
  sayList,
  addSay,
  sayDetail,
  updateSay,
  delSay,
} = require('../controller/say');

router.prefix('/say');

router.post('/list', sayList);
router.post('/add', addSay);
router.get('/detail', sayDetail);
router.post('/update', updateSay);
router.get('/delete', delSay);

module.exports = router;
