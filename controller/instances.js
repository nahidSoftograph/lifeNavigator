let Instance = require('../models/instance'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Category = require('../models/category'),
    FutureGoal = require('../models/futureGoal'),
    MyPlan = require('../models/myPlan'),
    Home = require('../models/home'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Option = require('../models/option'),
    SiteUserSignUp = require('../models/siteUserSignUp'),
    optionController = require('../controller/option'),
    Sick = require('../models/sick');

let alterVisibility = (req, res, next) => {
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        res.status(202).json({
            success: false,
            message: err
        });
    } else {
        Instance.findById(instanceId, (err, instance) => {
            if (err) {
                res.status(202).json({
                    success: false,
                    message: err
                });
            } else {
                instance.isActive = !instance.isActive;
                instance.save((err, instance) => {
                    if (err) {
                        res.status(202).json({
                            success: false,
                            message: err
                        });
                    } else {
                        console.log('Instance visibility changed');
                        res.status(201).json({
                            success: true,
                            instance: instance
                        });
                    }
                });
            }
        });
    }
};

let renderEditInstances = (req, res, next) => {
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        console.log('Invalid instance id');
    } else {
        detectInstance(instanceId, (err, instance) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                instanceId = instance._id;
                console.log('-----------------Instance Id: ' + instanceId);
                getHomePageInformation(instanceId, (err, home) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        getSiteUserSignUpInformation(instanceId, (err, siteUserSignUp) => {
                            if (err) {
                                console.log('Error: ' + err);
                            } else {
                                getAccomplishmentInformation(instanceId, (err, accomplishment) => {
                                    if (err) {
                                        console.log('Error: ' + err);
                                    } else {
                                        getFutureGoalInformation(instanceId, (err, futureGoal) => {
                                            if (err) {
                                                console.log('Error: ' + err);
                                            } else {
                                                getAssessRiskInformation(instanceId, (err, assessRisk) => {
                                                    if (err) {
                                                        console.log('Error: ' + err);
                                                    } else {
                                                        getMyPlanInformation(instanceId, (err, myPlan) => {
                                                            if (err) {
                                                                console.log('Error: ' + err);
                                                            } else {
                                                                optionController.cookOptions(instanceId, (err, options) => {
                                                                    if (err) {
                                                                        console.log('Error: ' + err);
                                                                    } else {
                                                                        Instance.find({}, (err, instances) => {
                                                                            if (err) {
                                                                                console.log('Error: ' + err);
                                                                            } else {
                                                                                console.log('Home');
                                                                                console.log(home);
                                                                                res.render('instances/edit', {
                                                                                    'title': 'Edit instances',
                                                                                    home: home,
                                                                                    siteUserSignUp: siteUserSignUp,
                                                                                    accomplishment: accomplishment,
                                                                                    futureGoal: futureGoal,
                                                                                    assessRisk: assessRisk,
                                                                                    myPlan: myPlan,
                                                                                    options: options,
                                                                                    instances: instances
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
};

let renderCreateSelect = (req, res, next) => {
    Instance.find({}, (err, instances) => {
        if (err) {
            console.log(err);
        } else {
            res.render('instances/createSelect', {'title': 'Create Select Instances', instances: instances });
        }
    });
};

let createInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink;

    if (!instanceName) {
        console.log('Invalid instance name');
    } else if (!companyName) {
        console.log('Invalid company name');
    } else if (!instanceLink) {
        console.log('Invalid instance link');
    } else {
        let instance = new Instance({
            instanceName: instanceName,
            companyName: companyName,
            instanceLink: instanceLink
        });
        instance.save((err, instance) => {
            if (err) {
                console.log(err);
            } else {
                let currentInstanceId = instance._id;
                Instance.findOne({isHome: true}, (err, homeInstance) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        let homeInstanceId = homeInstance._id;
                        cloneAccomplishment(currentInstanceId, homeInstanceId, (err, accomplishment) => {
                            if (err) {
                                console.log('Error: ' + err);
                            } else {
                                cloneAssessRisk(currentInstanceId, homeInstanceId, (err, assessRisk) => {
                                    if (err) {
                                        console.log('Error: ' + err);
                                    } else {
                                        cloneFutureGoal(currentInstanceId, homeInstanceId, (err, futureGoal) => {
                                            if (err) {
                                                console.log('Error: ' + err);
                                            } else {
                                                cloneHome(currentInstanceId, homeInstanceId, (err, home) => {
                                                    if (err) {
                                                        console.log('Error: ' + err);
                                                    } else {
                                                        cloneCategory(currentInstanceId, homeInstanceId, (err, done) => {
                                                            if (err) {
                                                                console.log('Error: ' + err);
                                                            } else {
                                                                console.log('Update the category');
                                                                cloneMyPlan(currentInstanceId, homeInstanceId, (err, myPlan) => {
                                                                    if (err) {
                                                                        console.log('Error: ' + err);
                                                                    } else {
                                                                        console.log('Cloned the my Plan');
                                                                        res.redirect('/instances/createSelectInstances');
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
};

let updateInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink,
        id = req.body.id;
    console.log(req.body);
    if (!instanceName) {

    } else if (!id) {

    } else if (!companyName) {

    } else if (!instanceLink) {

    } else {
        Instance.findById(id, (err, instance) => {
            if (err) {

            } else {
                instance.instanceName = instanceName || instance.instanceName;
                instance.companyName = companyName || instance.companyName;
                instance.instanceLink = instanceLink || instance.instanceLink;
                instance.save((err, instance) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/instances/createSelectInstances');
                    }
                });
            }
        });
    }
};

let changeInstanceActivation = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        console.log('Invalid id');
    } else {
        Instance.findById(id, (err, instance) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                instance.isActive = !instance.isActive;
                instance.save((err, instance) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        res.redirect('/instances/createSelectInstances');
                    }
                });
            }
        });
    }
};

let deleteInstance = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        console.log('Invalid id');
    } else {
        Instance.findByIdAndRemove(id, (err, instance) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                res.redirect('/instances/createSelectInstances');
            }
        });
    }
};

module.exports = {
    renderEditInstances,
    renderCreateSelect,
    createInstance,
    updateInstance,
    changeInstanceActivation,
    deleteInstance,
    alterVisibility
};

let cloneAccomplishment = (currentInstanceId, homeInstanceId, cb) => {
    Accomplishment.findOne({instanceId: homeInstanceId}, (err, accomplishment) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            let newAccomplishment = new Accomplishment({
                instanceId: currentInstanceId,
                headerText: accomplishment.headerText,
                subHeaderText: accomplishment.subHeaderText,
                buttonText: accomplishment.buttonText,
                buttonLink: accomplishment.buttonLink
            });
            newAccomplishment.save((err, accomplishment) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, accomplishment);
                }
            });
        }
    });
};

let cloneAssessRisk = (currentInstanceId, homeInstanceId, cb) => {
    AssessRisk.findOne({instanceId: homeInstanceId}, (err, assessRisk) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            let newAssessRisk = new AssessRisk({
                instanceId: currentInstanceId,
                headerText: assessRisk.headerText,
                paragraphText: assessRisk.paragraphText,
                subHeaderText: assessRisk.subHeaderText,
                buttonText: assessRisk.buttonText,
                buttonLink: assessRisk.buttonLink
            });
            newAssessRisk.save((err, assessRisk) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, assessRisk);
                }
            });
        }
    });
};

let cloneCategory = (currentInstanceId, homeInstanceId, cb) => {
    Category.find({instanceId: homeInstanceId}, (err, categories) => {
        if (categories.length == 0) {
            return cb (null, 'done');
        } else if (err) {
            console.log('error: ' + err);
            return cb (err, null);
        } else {
            for (let index=0; index<categories.length; index++) {
                let currentCategory = categories[index];
                let newCategory = new Category({
                    instanceId: currentInstanceId,
                    name: currentCategory.name,
                    class: currentCategory.class,
                    catId: currentCategory.catId,
                    isVisible: currentCategory.isVisible,
                    options: currentCategory.options
                });

                newCategory.save((err, newCategory) => {
                    if (err) {
                        console.log('Error: ' + err);
                        return cb (err, null);
                    } else {
                        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Existing category');
                        console.log(currentCategory);
                        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< New category');
                        console.log(newCategory)
                        cloneOptions(currentCategory._id, newCategory._id, currentInstanceId, homeInstanceId, (err, val) => {
                            if (err) {
                                console.log('Error: ' + err);
                                return cb (err, null);
                            } else {
                                console.log('Updated the options');
                                if (index == (categories.length - 1)) {
                                    return cb (null, 'Done');
                                }
                            }
                        });
                    }
                });
            }
        }
    });
};

let cloneHome = (currentInstanceId, homeInstanceId, cb) => {
    Home.findOne({instanceId: homeInstanceId}, (err, home) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            let newHome = new Home({
                instanceId: currentInstanceId,
                welComeText: home.welComeText,
                logoPath: home.logoPath,
                header: home.header,
                info: home.info,
                anchorText: home.anchorText,
                anchorLink: home.anchorLink,
                buttonText: home.buttonText,
                buttonLink: home.buttonLink
            });
            newHome.save((err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, home);
                }
            });
        }
    });
};

let cloneFutureGoal = (currentInstanceId, homeInstanceId, cb) => {
    FutureGoal.findOne({instanceId: homeInstanceId}, (err, futureGoal) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            let newFutureGoal = new FutureGoal({
                instanceId: currentInstanceId,
                headerText: futureGoal.headerText,
                subHeaderText: futureGoal.subHeaderText,
                buttonText: futureGoal.buttonText,
                buttonLink: futureGoal.buttonLink
            });
            newFutureGoal.save((err, futureGoal) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, futureGoal);
                }
            });
        }
    });
};

let cloneIndustry = (instanceId, cb) => {

};

let cloneOccupation = (instanceId, cb) => {

};

let cloneOptions = (currentCategoryId, newCategoryId, currentInstanceId, homeInstanceId, cb) => {
    Option.find({categoryId: currentCategoryId, instanceId: homeInstanceId}, (err, options) => {
        console.log('*************************Options**************************');
        console.log('Cloning option for: ' + currentInstanceId);
        console.log(options);
        console.log("*************************Options***************************");
        if (options.length == 0) {
            return cb (null, 'done');
        } else if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            for (let index=0; index<options.length; index++) {
                let existingOption = options[index];
                let newOption = new Option({
                    optionName: existingOption.optionName,
                    instanceId: currentInstanceId,
                    catId: existingOption.catId,
                    categoryId: newCategoryId,
                    optId: existingOption.optId,
                    titlePast: existingOption.titlePast,
                    titleFuture: existingOption.titleFuture,
                    selected: existingOption.selected,
                    iconPath: existingOption.iconPath,
                    isVisible: existingOption.isVisible
                });
                newOption.save((err, option) => {
                    if (err) {
                        console.log('Error: ' + err);
                        return cb (err, null);
                    } else {
                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Existing option');
                        console.log(existingOption);
                        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> New option');
                        console.log(option);
                        if (index == (options.length - 1)) {
                            return cb (null, 'Done');
                        }
                    }
                });
            }
        }
    });
};

let cloneSick = (instanceId, cb) => {

};

let cloneMyPlan = (currentInstanceId, homeInstanceId, cb) => {
    MyPlan.findOne({instanceId: homeInstanceId}, (err, myPlan) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            let newMyPlan = new MyPlan({
                instanceId: currentInstanceId,
                headerText: myPlan.headerText,
                subHeaderText: myPlan.subHeaderText,
                complement: myPlan.complement,
                finalInstruction: myPlan.finalInstruction
            });
            newMyPlan.save((err, myPlan) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, myPlan);
                }
            });
        }
    });
};

let getHomePageInformation = (instanceId, cb) => {
  Home.findOne({instanceId: instanceId}, (err, home) => {
      if (err) {
        return cb (err, null);
      } else {
          return cb (null, home);
      }
  });
};

let getSiteUserSignUpInformation = (instanceId, cb) => {
    SiteUserSignUp.findOne({instanceId: instanceId}, (err, siteUserSignUp) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, siteUserSignUp);
        }
    });
};

let getAccomplishmentInformation = (instanceId, cb) => {
    Accomplishment.findOne({instanceId: instanceId}, (err, accomplishment) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, accomplishment);
        }
    });
};

let getFutureGoalInformation = (instanceId, cb) => {
    FutureGoal.findOne({instanceId: instanceId}, (err, futureGoal) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, futureGoal);
        }
    });
};

let getAssessRiskInformation = (instanceId, cb) => {
    AssessRisk.findOne({instanceId: instanceId}, (err, assessRisk) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, assessRisk);
        }
    });
};

let getMyPlanInformation = (instanceId, cb) => {
    MyPlan.findOne({instanceId: instanceId}, (err, myPlan) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, myPlan);
        }
    });
};

let detectInstance = (instanceId, cb) => {
    Instance.findById(instanceId, (err, instance) => {
        if (err) {
            console.log('Error in find instance');
            Instance.findOne({isHome: true}, (err, instance) => {
                if (err) {
                    return cb (err, null);
                } else {
                    console.log('Set default instance');
                    return cb (null, instance);
                }
            });
        } else {
            if (!instance) {
                console.log('Null instance')
                Instance.findOne({isHome: true}, (err, instance) => {
                    if (err) {
                        return cb (err, null);
                    } else {
                        return cb (null, instance);
                    }
                });
            } else {
                console.log('Send required instance');
                console.log(instance);
                return cb (null, instance);
            }
        }
    });
};

