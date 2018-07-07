let express = require('express'),
    router = express.Router(),
    siteUserController = require('../controller/siteUser');

router.get('/display', siteUserController.displaySiteUser);
router.get('/delete/:siteUserId', siteUserController.deleteUser);

module.exports = router;