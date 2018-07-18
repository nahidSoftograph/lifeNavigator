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
    SiteUserPiiData = require('../models/siteUserPiiData'),
    SiteUserNonPiiData = require('../models/siteUserNonPiiData'),
    Card = require('../models/card'),
    CardButton = require('../models/cardButton'),
    FutureGoal = require('../models/futureGoal');

let apiHelperUpdateUser = require('./apiHelperUpdateUser');

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
                                                                    assessRisk.industry = industries;
                                                                    assessRisk.occupation = occupations;
                                                                    assessRisk.healthIssue = sicks;
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
                                                                                            getSiteUser(instance, (err, siteUser) => {
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
        let siteUser = new SiteUser(req.body);
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

let updateSiteUserData = (req, res, next) => {

    let userId = req.body.userId,
        instanceId = req.body.instanceId,
        instanceName = req.body.instanceName,
        accomplishmentOptionId = req.body.accomplishmentOptionId,
        futureGoalOptionId = req.body.futureGoalOptionId,
        heightFeet = req.body.heightFeet,
        heightInch = req.body.heightInch,
        weight = req.body.weight,
        eventDescription = req.body.eventDescription;
    if (instanceId) {
        apiHelperUpdateUser.updateInstanceId(req, res, next, userId, instanceId, eventDescription);
    } else if (instanceName) {
        apiHelperUpdateUser.updateInstanceName(req, res, next, userId, instanceName, eventDescription);
    } else if (accomplishmentOptionId) {
        apiHelperUpdateUser.updateAccomplishmentOptionId(req, res, next, userId, accomplishmentOptionId, eventDescription);
    } else if (futureGoalOptionId) {
        apiHelperUpdateUser.updateFutureGoalOptionId(req, res, next, userId, futureGoalOptionId, eventDescription);
    } else if (heightFeet) {
        apiHelperUpdateUser.updateHeightFeet(req, res, next, userId, heightFeet, eventDescription);
    } else if (heightInch) {
        apiHelperUpdateUser.updateHeightInch(req, res, next, userId, heightInch, eventDescription);
    } else if (weight) {
        apiHelperUpdateUser.updateWeight(req, res, next, userId, weight, eventDescription);
    } else {
        apiHelperUpdateUser.updateEventDescription(req, res, next, userId, eventDescription);
    }
};

module.exports = {
    getCategories,
    addSiteUser,
    updateSiteUserData
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
                            cards[index].cardButtons = cardsButton;
                            if (index == (cards.length - 1)) {
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

let getSiteUser = (instance, cb) => {
    let instanceId = instance._id;
    let siteUserPiiData = new SiteUserPiiData ({
        instanceId: instanceId,
        instanceName: instance.instanceName,

        age: '',
        gender: '',
        zip: '',

        accomplishmentOptions: [],
        futureGoalOptions: [],
        accomplishmentFullOptions: [],
        futureGoalFullOptions: [],

        occupation: '',
        industry: '',
        income: '',
        heightFeet: '',
        heightInch: '',
        weight: '',
        healthIssue: [],
        retireAge: '',

        events: []
    });
    siteUserPiiData.save((err, siteUserPiiData) => {
        if (err) {
            return cb (err, null);
        } else {
            let siteUserNonPiiData = new SiteUserNonPiiData ({
                instanceId: instanceId,
                instanceName: instance.instanceName,
                referencePiiId: siteUserPiiData._id,

                age: '',
                gender: '',
                zip: '',

                accomplishmentOptions: [],
                futureGoalOptions: [],
                accomplishmentFullOptions: [],
                futureGoalFullOptions: [],

                occupation: '',
                industry: '',
                income: '',
                heightFeet: '',
                heightInch: '',
                weight: '',
                healthIssue: [],
                retireAge: '',

                events: []
            });
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, siteUserNonPiiData);
                }
            });
        }
    });
};

