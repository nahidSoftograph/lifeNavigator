let express = require('express'),
    router = express.Router(),
    siteUserSignUpController = require('../controller/siteUserSignUp');

router.get('/display/:instanceId', siteUserSignUpController.displaySiteUserSignUp);
router.post('/create', siteUserSignUpController.createSiteUserSignUp);
router.post('/update/:siteUserSignUpId', siteUserSignUpController.updateSiteUserSignUp);

module.exports = router;