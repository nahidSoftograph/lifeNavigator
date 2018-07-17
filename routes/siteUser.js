let express = require('express'),
    router = express.Router(),
    siteUserController = require('../controller/siteUser');

router.get('/display', siteUserController.displaySiteUser);
router.get('/displayIndividualSiteUser/:siteUserNonPiiDataId', siteUserController.displayIndividualSiteUser);
router.get('/displaySiteUserPiiData', siteUserController.displaySiteUserPiiData);
router.get('/displaySiteUserNonPiiData', siteUserController.displaySiteUserNonPiiData);
router.get('/delete/:siteUserId', siteUserController.deleteUser);

module.exports = router;