let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Sick = require('../models/sick'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    FutureGoal = require('../models/futureGoal');

let createCategory = (req, res, next) => {
    let name = req.body.categoryName,
        instanceId = req.body.instanceId,
        catId = req.body.catId,
        callBackURL = req.body.callBackURL;

    if (!name) {
        console.log('Invalid category name');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!catId) {
        console.log('Invalid catId');
    } else if (!callBackURL) {
        console.log('call back url');
    } else {
        let category = new Category({
            instanceId: instanceId,
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
        catClass = req.body.class,
        callBackURL = req.body.callBackURL;
    if (!id) {
        console.log('Invalid category id');
    } else if (!name) {
        console.log('Invalid category name');
    } else if (!catId) {
        console.log('Invalid category cat Id');
    } else if (!catClass) {
        console.log('Invalid category cat calss');
    } else if (!callBackURL) {
        console.log('invalid call back url');
    } else {
        Category.findById(id, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                category.name = name || category.name;
                category.catId = catId || category.catId;
                category.class = catClass || category.catClass;
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

let displayCategory = (req, res, next) => {
    let instanceId = req.params.id;
    if (!instanceId) {
        console.log('Invalid instance id');
    } else {
        Category.find({instanceId: instanceId}, (err, categories) => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..  Instance Id:: ' + instanceId);
            console.log(categories);
            console.log("----------------------------------------------------------------------");
            cookCategories(instanceId, (err, categories) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    res.render('instanceSite/category', {
                        title: 'Category',
                        categories: categories,
                        instanceId: instanceId
                    });
                }
            });
        });
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    alterCategoryVisibility,
    displayCategory
};

let traverseAllCategories = (categories, instanceId, cb) => {

    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Option.find({instanceId: categories[index].instanceId}, (err, options) => {
                if (err) {
                    return cb (err, null);
                } else {
                    categories[index].options = options;
                    if (categories.length - 1 == index) {
                        return cb (null, categories);
                    }
                }
            });
        }
    }
};

let cookCategories = (instanceId, cb) => {
    Category.find({instanceId: instanceId}, (err, categories) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            traverseAllCategories(categories, instanceId, (err, categories) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, categories);
                }
            });
        }
    });
};