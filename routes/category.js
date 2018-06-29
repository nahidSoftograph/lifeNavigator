let express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    categoryController = require('../controller/category'),
    Category = require('../models/category');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/logo')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

router.post('/', categoryController.createCategory);

module.exports = router;