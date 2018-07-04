let express = require('express'),
    router = express.Router(),
    sickController = require('../controller/sick');

router.post('/create', sickController.createSick);
router.post('/update/:id', sickController.updateSick);
router.post('/delete/:id', sickController.deleteSick);
router.post('/alterVisibility/:id', sickController.alterSickVisibility);

module.exports = router;