let express = require('express'),
    router = express.Router(),
    defaultSiteController = require('../controller/defaultSite');

router.get('/homePage', defaultSiteController.renderHomePage);
router.get('/accomplishments', defaultSiteController.renderAccomplishments);
router.get('/futureGoals', defaultSiteController.renderFutureGoals);
router.get('/assessRisk', defaultSiteController.renderAssessRisk);
router.get('/myPlan', defaultSiteController.renderMyPlan);

module.exports = router;