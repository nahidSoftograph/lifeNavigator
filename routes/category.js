let express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    categoryController = require('../controller/category'),
    Category = require('../models/category');

router.post('/create', categoryController.createCategory);
router.post('/update/:categoryId', categoryController.updateCategory);
router.post('/delete/:categoryId', categoryController.deleteCategory);
router.post('/alterVisibility/:categoryId', categoryController.alterCategoryVisibility);

module.exports = router;