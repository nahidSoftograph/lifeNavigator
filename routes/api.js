let express = require('express'),
    apiController = require('../controller/api'),
    router = express.Router();

router.get('/demo', apiController.getCategories);

module.exports = router;