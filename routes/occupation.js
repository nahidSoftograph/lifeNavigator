let express = require('express'),
    router = express.Router(),
    occupationController = require('../controller/occupation');

router.post('/create', occupationController.createOccupation);

module.exports = router;