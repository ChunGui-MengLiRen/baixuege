const router = require('koa-router')();
const { aboutDetail, updateAbout } = require('../controller/about');

router.prefix('/about');

router.get('/detail', aboutDetail);
router.post('/update', updateAbout);

module.exports = router;
