let express = require('express'),
    router = express.Router(),
    assessRiskController = require('../controller/assessRisk');

router.post('/create', assessRiskController.createAssessRisk);
router.get('/display', assessRiskController.displayAssessRisk);

module.exports = router;