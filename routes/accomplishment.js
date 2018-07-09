let express = require('express'),
    router = express.Router(),
    accomplishmentController = require('../controller/accomplishment');

router.get('/display/:instanceId', accomplishmentController.displayAccomplishment);
router.post('/create/:instanceId', accomplishmentController.createAccomplishment);
router.post('/update/:accomplishmentId', accomplishmentController.updateAccomplishment);
router.post('/updateEditInstance/:accomplishmentId', accomplishmentController.updateEditInstanceAccomplishment);

module.exports = router;