let Category = require('../models/category');

let createCategory = (req, res, next) => {
    let categoryName = req.body.categoryName,
        categoryText = req.body.categoryText,
        callBackURL = req.body.callBackURL,
        isCategoryUnderAccomplishment = req.body.isCategoryUnderAccomplishment,
        isCategoryUnderFutureGoals = req.body.isCategoryUnderFutureGoals,
        parentSectionId = req.body.parentSectionId;

    if (!categoryName) {
        console.log('Invalid category name');
    } else if (!categoryText) {
        console.log('Invalid category text');
    } else if (!callBackURL) {
        console.log('call back url');
    } else if (!isCategoryUnderAccomplishment) {
        console.log('invalid category accomplishment validity');
    } else if (!isCategoryUnderFutureGoals) {
        console.log('invalid category future goals validity');
    } else if (!parentSectionId) {
        console.log('Invalid parent section id');
    } else {
        let category = new Category({
            categoryName: categoryName,
            categoryText: categoryText,
            isCategoryUnderAccomplishment: isCategoryUnderAccomplishment,
            isCategoryUnderFutureGoals: isCategoryUnderFutureGoals,
            parentSectionId: parentSectionId,
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
    let categoryId = req.params.categoryId,
        categoryName = req.body.categoryName,
        categoryText = req.body.categoryText,
        callBackURL = req.body.callBackURL,
        isCategoryUnderAccomplishment = req.body.isCategoryUnderAccomplishment,
        isCategoryUnderFutureGoals = req.body.isCategoryUnderFutureGoals;
    if (!categoryId) {
        console.log('Invalid category id');
    } else if (!categoryName) {
        console.log('Invalid category name');
    } else if (!categoryText) {
        console.log('Invalid category text');
    } else if (!callBackURL) {
        console.log('call back url');
    } else if (!isCategoryUnderAccomplishment) {
        console.log('invalid category accomplishment validity');
    } else if (!isCategoryUnderFutureGoals) {
        console.log('invalid category future goals validity');
    } else {
        Category.findById(categoryId, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                category.categoryName = categoryName || category.categoryName;
                category.categoryText = categoryText || category.categoryText;
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

let deleteCategory = (req, res, next) => {
    let categoryId = req.params.categoryId,
        callBackURL = req.body.callBackURL;
    if (!categoryId) {
        console.log('Invalid category Id.');
    } else if (!callBackURL) {
        console.log('Invalid callback URL');
    } else {
        Category.findOneAndRemove(categoryId, (err, category) => {
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