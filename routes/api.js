let express = require('express'),
    apiController = require('../controller/api'),
    router = express.Router();

router.get('/rawInfo/:companyName', apiController.getCategories);
router.get('/createUser', apiController.addSiteUser);

module.exports = router;