let express = require('express'),
    router = express.Router(),
    assessRiskController = require('../controller/assessRisk');

router.post('/create', assessRiskController.createAssessRisk);
router.post('/update/:id', assessRiskController.updateAssessRisk);

module.exports = router;