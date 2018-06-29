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

router.post('/create', categoryController.createCategory);
router.post('/update/:categoryId', categoryController.updateCategory);
router.post('/delete/:categoryId', categoryController.deleteCategory);
router.post('/alterVisibility/:categoryId', categoryController.alterCategoryVisibility);

module.exports = router;