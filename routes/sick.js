let express = require('express'),
    router = express.Router(),
    sickController = require('../controller/sick');

router.post('/create', sickController.createSick);

module.exports = router;