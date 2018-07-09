let express = require('express'),
    router = express.Router(),
    futureGoalController = require('../controller/futureGoal');

router.get('/display/:instanceId', futureGoalController.displayFutureGoal);
router.post('/create/', futureGoalController.createFutureGoal);
router.post('/update/:futureGoalId', futureGoalController.updateFutureGoal);
router.post('/updateEditInstance/:futureGoalId', futureGoalController.updateEditInstanceFutureGoal);

module.exports = router;