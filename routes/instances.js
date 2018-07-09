let express = require('express'),
    router = express.Router(),
    instancesController = require('../controller/instances');

router.get('/createSelectInstances', instancesController.renderCreateSelect);
router.get('/editInstances/:instanceId', instancesController.renderEditInstances);
router.post('/createInstance', instancesController.createInstance);
router.post('/updateInstance', instancesController.updateInstance);
router.get('/changeInstanceActivation/:id', instancesController.changeInstanceActivation);
router.get('/deleteInstance/:id', instancesController.deleteInstance);

module.exports = router;