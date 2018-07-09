let express = require('express'),
    router = express.Router(),
    myPlanController = require('../controller/myPlan'),
    MyPlan = require('../models/myPlan');

router.get('/display/:instanceId', myPlanController.displayMyPlan);
router.post('/create/', myPlanController.createMyPlan);
router.post('/update/:myPlanId', myPlanController.updateMyPlan);
router.post('/updateEditInstance/:myPlanId', myPlanController.updateEditInstanceMyPlan);

module.exports = router;