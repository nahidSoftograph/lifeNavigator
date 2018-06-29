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

module.exports = {
    createCategory
};