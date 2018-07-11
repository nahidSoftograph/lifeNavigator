let express = require('express'),
    router = express.Router(),
    cardButtonController = require('../controller/cardButton');

router.post('/create', cardButtonController.createCardButton);
router.post('/update/:cardButtonId', cardButtonController.updateCardButton);
router.get('/alterVisibility/:cardButtonId', cardButtonController.alterVisibility);

module.exports = router;