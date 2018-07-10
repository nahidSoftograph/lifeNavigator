let express = require('express'),
    router = express.Router(),
    defaultInstanceController = require('../controller/defaultInstance');

router.get('/getData', defaultInstanceController.getDefaultInstance);

module.exports = router;