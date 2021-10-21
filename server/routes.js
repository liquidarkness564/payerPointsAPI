const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/', controller.getAllPayers);
router.post('/', controller.postTransaction);
router.put('/', controller.updatePoints);

module.exports = router;