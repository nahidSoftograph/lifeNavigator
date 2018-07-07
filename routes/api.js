let express = require('express'),
    apiController = require('../controller/api'),
    router = express.Router();

router.get('/rawInfo/:instanceLink', apiController.getCategories);
router.post('/createUser', apiController.addSiteUser);
router.post('/updateUser', apiController.updateSiteUserOptionSelection);

module.exports = router;