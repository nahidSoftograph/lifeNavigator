let express = require('express'),
    apiController = require('../controller/api'),
    router = express.Router();

router.get('/rawInfo/:companyName', apiController.getCategories);

module.exports = router;