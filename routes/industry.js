let express = require('express'),
    router = express.Router(),
    industryController = require('../controller/industry');

router.post('/create', industryController.createIndustry);
router.post('/update/:id', industryController.updateIndustry);
router.post('/delete/:id', industryController.deleteIndustry);

module.exports = router;