let express = require('express'),
    router = express.Router(),
    cardController = require('../controller/card');

router.post('/create/:instanceId', cardController.createCard);

module.exports = router;