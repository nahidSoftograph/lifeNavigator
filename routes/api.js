let express = require('express'),
    apiController = require('../controller/api'),
    router = express.Router();

router.get('/rawInfo/:companyName', apiController.getCategories);
router.post('/createUser', apiController.addSiteUser);

module.exports = router;