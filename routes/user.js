let express = require('express'),
    router = express.Router(),
    userController = require('../controller/user');

router.get('/', userController.renderUsers);
router.post('/', userController.createUser);

module.exports = router;