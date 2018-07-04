let express = require('express'),
    router = express.Router(),
    industryController = require('../controller/industry');

router.post('/create', industryController.createIndustry);

module.exports = router;