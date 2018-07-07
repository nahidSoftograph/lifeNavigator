let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Sick = require('../models/sick'),
    SiteUser = require('../models/siteUser'),
    FutureGoal = require('../models/futureGoal');

let getCategories = (req, res, next) => {
    let instanceLink = req.params.instanceLink;
    getApiInstance(instanceLink, (err, instance) => {
        if (err) {
            return res.status(202).json({
                success: false,
                error: err
            });
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

let addSiteUser = (req, res, next) => {
    console.log(req.body);
    let age = req.body.age,
        gender = req.body.gender,
        zip = req.body.zip;
    if (!age) {
        return res.status(202).json({
            success: false,
            message: 'Invalid age.'
        });
    } else if (!gender) {
        return res.status(202).json({
            success: false,
            message: 'Invalid age.'
        });
    } else if (!zip) {
        return res.status(202).json({
            success: false,
            message: 'Invalid age.'
        });
    } else {
        let siteUser = new SiteUser({
            age: age,
            gender: gender,
            zip: zip
        });
        siteUser.save((err, siteUser) => {
            if (err) {
                console.log('Error: ' + err);
                return res.status(202).json({
                    success: false,
                    message: 'Error: ' + err
                });
            } else {
                console.log('User Created');
                return res.status(201).json({
                    success: true,
                    user: siteUser
                });
            }
        });
    }
};

let updateSiteUserOptionSelection = (req, res, next) => {

    let userId = req.body.userId,
        accomplishmentOptions = req.body.accomplishments,
        futureGolOptions = req.body.futureGoals;
    SiteUser.findById(userId, (err, siteUser) => {
        if (err) {
            console.log('Error: ' + err);
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            getOptionsId(accomplishmentOptions, (err, accomplishmentOptions) => {
                if (err) {
                    console.log('Error: ' + err);
                    console.log('Error: ' + err);
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    getOptionsId(futureGolOptions, (err, futureGoalOptions) => {
                        if (err) {
                            console.log('Error: ' + err);
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUser.accomplishmentOptions = accomplishmentOptions;
                            siteUser.futureGoalOptions = futureGoalOptions;
                            siteUser.save((err, siteUser) => {
                                if (err) {
                                    console.log('Error: ' + err);
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    console.log('Site User Updated.');
                                    return res.status(202).json({
                                        success: true,
                                        message: 'Successfully updated the site user',
                                        siteUser: siteUser
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
    getCategories,
    addSiteUser,
    updateSiteUserOptionSelection
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

getOptionsId = (options, cb) => {
    let optionsId = [];
    for (let index=0; index<options.length; index++) {
        currentOption = options[index];
        optionsId.push(currentOption._id);

        if (index == (options.length - 1)) {
            return cb (null, optionsId);
        }
    }
};

let getApiInstance = (instanceLink, cb) => {
    console.log('Instance link: ' + instanceLink);
    Instance.findOne({instanceLink: instanceLink}, (err, instance) => {
        if (err) {
            console.log('Errro: ' + err);
            return cb (err, null);
        } else if (!instance) {
            console.log('Instance: ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log(instance);
            Instance.findOne({isHome: true}, (err, instance) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, instance);
                }
            });
        } else {
            return cb (null, instance);
        }
    });
};
