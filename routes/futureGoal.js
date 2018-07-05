let express = require('express'),
    router = express.Router(),
    futureGoalController = require('../controller/futureGoal');

router.get('/display/:instanceId', futureGoalController.displayFutureGoal);
router.post('/create/', futureGoalController.createFutureGoal);
router.post('/update/:futureGoalId', futureGoalController.updateFutureGoal);

module.exports = router;