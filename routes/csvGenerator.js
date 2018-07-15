let express = require('express'),
    router = express.Router(),
    csvGeneratorController = require('../controller/csvGenerator');

router.get('/generate', csvGeneratorController.generateCSV);

module.exports = router;