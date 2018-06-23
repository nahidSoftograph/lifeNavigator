let express = require('express'),
    router = express.Router(),
    instancesController = require('../controller/instances');

router.get('/createSelectInstances', instancesController.renderCreateSelect);
router.get('/editInstances', instancesController.renderEditInstances);

module.exports = router;