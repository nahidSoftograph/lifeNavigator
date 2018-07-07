let express = require('express'),
    router = express.Router(),
    siteUserController = require('../controller/siteUser');

router.get('/display', siteUserController.displaySiteUser);

module.exports = router;