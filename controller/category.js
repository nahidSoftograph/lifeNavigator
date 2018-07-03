let Category = require('../models/category');

let createCategory = (req, res, next) => {
    let name = req.body.categoryName,
        catId = req.body.catId,
        callBackURL = req.body.callBackURL;

    if (!name) {
        console.log('Invalid category name');
    } else if (!catId) {
        console.log('Invalid catId');
    } else if (!callBackURL) {
        console.log('call back url');
    } else {
        let category = new Category({
            name: name,
            catId: catId,
            class: name.toLowerCase(),
            isVisible: true
        });
        category.save((err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log(category);
                res.redirect(callBackURL);
            }
        });
    }
};

let updateCategory = (req, res, next) => {
    let id = req.params.id,
        name = req.body.categoryName,
        catId = req.body.catId,
        callBackURL = req.body.callBackURL;
    if (!id) {
        console.log('Invalid category id');
    } else if (!name) {
        console.log('Invalid category name');
    } else if (!catId) {
        console.log('Invalid category cat Id');
    } else if (!callBackURL) {
        console.log('invalid call back url');
    } else {
        Category.findById(id, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                category.name = name || category.name;
                category.catId = catId || category.catId;
                category.save((err, category) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Updated category: ');
                        console.log(category);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

let deleteCategory = (req, res, next) => {
    let categoryId = req.params.categoryId,
        callBackURL = req.body.callBackURL;
    if (!categoryId) {
        console.log('Invalid category Id.');
    } else if (!callBackURL) {
        console.log('Invalid callback URL');
    } else {
        Category.findByIdAndRemove(categoryId, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                res.redirect(callBackURL);
            }
        });
    }
};

let alterCategoryVisibility = (req, res, next) => {
    let categoryId = req.params.categoryId,
        callBackURL = req.body.callBackURL;
    if (!categoryId) {
        console.log('Invalid category Id.');
    } else if (!callBackURL) {
        console.log('Invalid callback URL');
    } else {
        Category.findById(categoryId, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                category.isVisible = !category.isVisible;
                category.save((err, category) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    alterCategoryVisibility
};