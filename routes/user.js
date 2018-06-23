let express = require('express'),
    router = express.Router(),
    userController = require('../controller/user');

router.get('/', userController.renderUsers);

module.exports = router;