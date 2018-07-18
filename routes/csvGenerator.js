let express = require('express'),
    router = express.Router(),
    csvGeneratorController = require('../controller/csvGenerator');

router.get('/generate', csvGeneratorController.generateCSV);
router.post('/generateFilteredData', csvGeneratorController.generateFilteredCsv);
router.get('/displayCsvGenerator', csvGeneratorController.displayCsvGeneratorForm);

module.exports = router;