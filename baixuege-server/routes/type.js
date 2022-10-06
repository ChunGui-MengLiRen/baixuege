const router = require('koa-router')();
const {
  typeList,
  typeAdd,
  typeDetail,
  typeUpdate,
  typeDel,
} = require('../controller/type');

router.prefix('/type');

router.post('/list', typeList);
router.post('/add', typeAdd);
router.get('/detail', typeDetail);
router.post('/update', typeUpdate);
router.get('/delete', typeDel);

module.exports = router;
