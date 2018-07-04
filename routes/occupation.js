let express = require('express'),
    router = express.Router(),
    occupationController = require('../controller/occupation');

router.post('/create', occupationController.createOccupation);
router.post('/update/:id', occupationController.updateOccupation);
router.post('/delete/:id', occupationController.deleteOccupation);
router.post('/alterVisibility/:id', occupationController.alterOccupationVisibility);

module.exports = router;