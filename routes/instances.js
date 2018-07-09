let express = require('express'),
    router = express.Router(),
    instancesController = require('../controller/instances');

router.get('/createSelectInstances', instancesController.renderCreateSelect);
router.get('/editInstances/:instanceId', instancesController.renderEditInstances);
router.post('/createInstance', instancesController.createInstance);
router.post('/updateInstance/:instanceId', instancesController.updateInstance);
router.get('/changeInstanceActivation/:id', instancesController.changeInstanceActivation);
router.get('/deleteInstance/:id', instancesController.deleteInstance);
router.get('/alterVisibility/:instanceId', instancesController.alterVisibility);

module.exports = router;