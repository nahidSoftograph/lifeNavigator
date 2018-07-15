let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    SiteUserSignUp = require('../models/siteUserSignUp'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Sick = require('../models/sick'),
    MyPlan = require('../models/myPlan'),
    SiteUser = require('../models/siteUser'),
    Card = require('../models/card'),
    CardButton = require('../models/cardButton'),
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
                                    getAssessRisk(instance._id, (err, assessRisk) => {
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
                                                                    getHome(instance._id, (err, home) => {
                                                                        if (err) {
                                                                            console.log('err: ' + err);
                                                                        } else {
                                                                            getSiteUserSignUp(instance._id, (err, siteUserSignUp) => {
                                                                                if (err) {
                                                                                    console.log('Error: ' + err);
                                                                                } else {
                                                                                    getMyPlan(instance._id, (err, myPlan) => {
                                                                                        if (err) {
                                                                                            console.log('err: ' + err);
                                                                                        } else {
                                                                                            getSiteUser(instance._id, (err, siteUser) => {
                                                                                                if (err) {
                                                                                                    console.log('Error: ' + err);
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
                                                                                                        siteUserSignUp: siteUserSignUp,
                                                                                                        saveMyPlan: myPlan,
                                                                                                        genericIconMisc: '/images/iconMisc.png',
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

let traverseAllCategories = (categories, instanceId, cb) => {

    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Option.find({instanceId: categories[index].instanceId, categoryId: categories[index]._id, isVisible: true}, (err, options) => {
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
    Category.find({instanceId: instanceId, isVisible: true}, (err, categories) => {
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

let getSiteUserSignUp = (instanceId, cb) => {
    SiteUserSignUp.findOne({instanceId: instanceId}, (err, siteUserSignUp) => {
        if (err) {
            return cb (err, null);
        } else {
            let formFieldOrders = {
              genderRow: siteUserSignUp.genderRow,
              yearRow: siteUserSignUp.yearRow,
              zipRow: siteUserSignUp.zipRow
            };
            formatSiteUserSignUpFormFiledOrders(formFieldOrders, (err, formFieldOrders) => {
               if (err) {
                   console.log('Error: ' + err);
                   return cb (err, null);
               } else {
                   siteUserSignUp.formFieldOrders = formFieldOrders;
                   return cb (null, siteUserSignUp);
               }
            });
        }
    });
};

let formatSiteUserSignUpFormFiledOrders = (data, cb) => {
    let newFormFieldOrders = [];
    for (let index=0; index<3; index++) {
        for (var key in data) {
            var item = data[key];
            if (index == item) {
                newFormFieldOrders.push(key);
                if (newFormFieldOrders.length == 3) {
                    console.log(newFormFieldOrders);
                    return cb (null, newFormFieldOrders);
                }
            }
        }
    }
};

let formatAssessRiskFormFiledOrders = (data, cb) => {
    let newFormFieldOrders = [];
    for (let index=0; index<6; index++) {
        for (var key in data) {
            var item = data[key];
            if (index == item) {
                newFormFieldOrders.push(key);
                if (newFormFieldOrders.length == 6) {
                    console.log(newFormFieldOrders);
                    return cb (null, newFormFieldOrders);
                }
            }
        }
    }
};

let getMyPlan = (instanceId, cb) => {
    MyPlan.findOne({instanceId: instanceId}, (err, myPlan) => {
        if (err) {
            return cb (err, null);
        } else {
            getCard(instanceId, (err, cards) => {
                if (err) {
                    return cb (err, null);
                } else {
                    myPlan.cards = cards;
                    return cb (null, myPlan);
                }
            });
        }
    });
};

let setOptionId = (options, cb) => {
    if (options.length == 0) {
        return cb (null, options);
    } else {
        for (let index=0; index<options.length; index++) {
            options[index].optId = index;
            if (index == options.length - 1) {
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
    Instance.findOne({instanceLink: instanceLink, isActive: true }, (err, instance) => {
        if (err) {
            console.log('Errro: ' + err);
            return cb (err, null);
        } else if (!instance) {
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

let getAssessRisk = (instanceId, cb) => {
    AssessRisk.findOne({instanceId: instanceId}, (err, assessRisk) => {
        if (err) {
            return cb (err, null);
        } else {
            let formFieldOrders = {
                workInfoRow: assessRisk.workInfoRow,
                incomeRow: assessRisk.incomeRow,
                heightWeightRow: assessRisk.heightWeightRow,
                smokeRow: assessRisk.smokeRow,
                healthIssueRow: assessRisk.healthIssueRow,
                retireAgeRow: assessRisk.retireAgeRow
            };
            formatAssessRiskFormFiledOrders(formFieldOrders, (err, formFieldOrders) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    assessRisk.formFieldOrders = formFieldOrders;
                    return cb (null, assessRisk);
                }
            });
        }
    });
};

let getCard = (instanceId, cb) => {
    Card.find({instanceId: instanceId}, (err, cards) => {
        if (err) {
            return cb (err, null);
        } else {
            if (cards.length == 0) {
                return cb (null, cards);
            } else {
                for (let index=0; index<cards.length; index++) {
                    getCardButton(cards[index]._id, (err, cardsButton) => {
                        if (err) {
                            return cb (err, null);
                        } else {
                            if (index == (cards.length - 1)) {
                                cards[index].cardButtons = cardsButton;
                                return cb (null, cards);
                            }
                        }
                    });
                }
            }
        }
    });
};

let getCardButton = (cardId, cb) => {
    CardButton.find({cardId: cardId}, (err, cardButtons) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, cardButtons);
        }
    });
};

let getSiteUser = (instanceId, cb) => {
    let siteUser = new SiteUser ({});
    siteUser.save((err, siteUser) => {
        if (err) {
            return cb (err, null);
        } else {
            siteUser.instanceId = instanceId;
            return cb (null, siteUser);
        }
    });
};
