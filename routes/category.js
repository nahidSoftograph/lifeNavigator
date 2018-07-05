let express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    categoryController = require('../controller/category'),
    Category = require('../models/category');

router.get('/display/:id', categoryController.displayCategory);
router.post('/create', categoryController.createCategory);
router.post('/update/:id', categoryController.updateCategory);
router.post('/delete/:categoryId', categoryController.deleteCategory);
router.post('/alterVisibility/:categoryId', categoryController.alterCategoryVisibility);

module.exports = router;