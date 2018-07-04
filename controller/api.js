let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    Accomplishment = require('../models/accomplishment'),
    FutureGoal = require('../models/futureGoal');

let getCategories = (req, res, next) => {
    Instance.findOne({isHome: true}, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            Accomplishment.findOne({instanceId: instance._id}, (err, accomplishment) => {
                if (err) {
                    console.log('Error: ' + err)    ;
                } else {
                    FutureGoal.findOne({instanceId: instance._id}, (err, futureGoal) => {
                        if (err) {
                            console.log('Error: ' + err)    ;
                        } else {
                            cookCategories(instance._id, (err, categories) => {
                                if (err) {
                                    console.log('Error: ' + err);
                                } else {
                                    res.status(201).json({
                                        title: 'My Title',
                                        futureGoal: futureGoal,
                                        accomplishment: accomplishment,
                                        categories: categories,
                                        instanceId: instance._id
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports = {
  getCategories
};

let traverseAllCategories = (categories, cb) => {

    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Option.find({catId: categories[index].catId, isVisible: true}, (err, options) => {
                if (err) {
                    return cb (err, null);
                } else {
                    categories[index].options = options;
                    console.log(categories[index].options);
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
            traverseAllCategories(categories, (err, categories) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, categories);
                }
            });
        }
    });
};