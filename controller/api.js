let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Sick = require('../models/sick'),
    FutureGoal = require('../models/futureGoal');

let getCategories = (req, res, next) => {
    let companyName = req.params.companyName || 'default';
    Instance.findOne({companyName: companyName}, (err, instance) => {
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
                                    AssessRisk.findOne({instanceId: instance._id}, (err, assessRisk) => {
                                        if (err) {
                                            console.log('Error: ' + err);
                                        } else {
                                            getIndustries(instance._id, (err, industries) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    getOccupations(instance._id, (err, occupations) => {
                                                       if (err) {
                                                           console.log('Error: ' + err);
                                                       } else {
                                                           getSicks(instance._id, (err, sicks) => {
                                                               if (err) {
                                                                   console.log('Error: ' + err);
                                                               } else {
                                                                   console.log('Get sicks');
                                                                   console.log(sicks);
                                                                    getHome(instance._id, (err, home) => {
                                                                        if (err) {
                                                                            console.log('err: ' + err);
                                                                        } else {
                                                                            res.status(201).json({
                                                                                title: 'My Title',
                                                                                home: home,
                                                                                futureGoal: futureGoal,
                                                                                accomplishment: accomplishment,
                                                                                assessRisk: assessRisk,
                                                                                categories: categories,
                                                                                occupations: occupations,
                                                                                industries: industries,
                                                                                sicks: sicks,
                                                                                instanceId: instance._id,
                                                                                genericIconMisc: '/images/iconMisc.png'
                                                                            });
                                                                        }
                                                                    });
                                                               }
                                                           });
                                                       }
                                                    });
                                                }
                                            });
                                        }
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



/*let cookCategories = (instanceId, cb) => {
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

let traverseAllCategories = (categories, instanceId, cb) => {

    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Option.find({catId: categories[index].catId, isVisible: true, instanceId: instanceId}, (err, options) => {
                if (err) {
                    return cb (err, null);
                } else {
                    setOptionId(options, (err, options) => {
                        if (err) {
                            return cb (err, null);
                        } else {
                            categories[index].options = options;
                            console.log(categories[index].options);
                            console.log('Length: ' + categories.length + ' index: ' +  index);
                            if (categories.length - 1 == index) {
                                return cb (null, categories);
                            }
                        }
                    });
                }
            });
        }
    }
};*/

let traverseAllCategories = (categories, instanceId, cb) => {

    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Option.find({instanceId: categories[index].instanceId, categoryId: categories[index]._id}, (err, options) => {
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
    console.log('Cooking categoies');
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

let getIndustries = (instanceId, cb) => {
    Industry.find({instanceId: instanceId}, (err, industries) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            return cb (null, industries);
        }
    });
};

let getOccupations = (instanceId, cb) => {
    Occupation.find({instanceId: instanceId}, (err, occupations) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            return cb (null, occupations);
        }
    });
};

let getSicks = (instanceId, cb) => {
    Sick.find({instanceId: instanceId}, (err, sicks) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            return cb (null, sicks);
        }
    });
};

let getHome = (instanceId, cb) => {
    Home.findOne({instanceId: instanceId}, (err, home) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            return cb (null, home);
        }
    });
};

let setOptionId = (options, cb) => {
    console.log('Get options');
    if (options.length == 0) {
        return cb (null, options);
    } else {
        for (let index=0; index<options.length; index++) {
            options[index].optId = index;
            console.log('Index: ' + index + ' length: ' + (options.length - 1));
            if (index == options.length - 1) {
                // console.log(options);
                return cb (null, options);
            }
        }
    }
};
