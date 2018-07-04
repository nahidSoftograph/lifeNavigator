let express = require('express'),
    router = express.Router(),
    industryController = require('../controller/industry');

router.post('/create', industryController.createIndustry);
router.post('/update/:id', industryController.updateIndustry);
router.post('/delete/:id', industryController.deleteIndustry);
router.post('/alterVisibility/:id', industryController.alterIndustryVisibility);

module.exports = router;