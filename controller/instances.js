let Instance = require('../models/instance'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Category = require('../models/category'),
    Card = require('../models/card'),
    CardButton = require('../models/cardButton'),
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
    } else {
        detectInstance(instanceId, (err, instance) => {
            if (err) {
            } else {
                instanceId = instance._id;
                getHomePageInformation(instanceId, (err, home) => {
                    if (err) {
                    } else {
                        getSiteUserSignUpInformation(instanceId, (err, siteUserSignUp) => {
                            if (err) {
                            } else {
                                getAccomplishmentInformation(instanceId, (err, accomplishment) => {
                                    if (err) {
                                    } else {
                                        getFutureGoalInformation(instanceId, (err, futureGoal) => {
                                            if (err) {
                                            } else {
                                                getAssessRiskInformation(instanceId, (err, assessRisk) => {
                                                    if (err) {
                                                    } else {
                                                        getMyPlanInformation(instanceId, (err, myPlan) => {
                                                            if (err) {
                                                            } else {
                                                                optionController.cookOptions(instanceId, (err, options) => {
                                                                    if (err) {
                                                                    } else {
                                                                        Instance.find({}, (err, instances) => {
                                                                            if (err) {
                                                                            } else {
                                                                                getCardButton(instanceId, (err, cardButtons) => {
                                                                                    if (err) {

                                                                                    } else {
                                                                                        res.render('instances/edit', {
                                                                                            'title': 'Edit instances',
                                                                                            home: home,
                                                                                            siteUserSignUp: siteUserSignUp,
                                                                                            accomplishment: accomplishment,
                                                                                            futureGoal: futureGoal,
                                                                                            assessRisk: assessRisk,
                                                                                            myPlan: myPlan,
                                                                                            options: options,
                                                                                            instances: instances,
                                                                                            currentInstance: instance,
                                                                                            cardButtons: cardButtons
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
};

let renderCreateSelect = (req, res, next) => {
    Instance.find({}, (err, instances) => {
        if (err) {
        } else {
            res.render('instances/createSelect', {'title': 'Create Select Instances', instances: instances });
        }
    });
};

let createInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink.split(' ').join('_');

    if (!instanceName) {
    } else if (!companyName) {
    } else if (!instanceLink) {
    } else {
        let instance = new Instance({
            instanceName: instanceName,
            companyName: companyName,
            instanceLink: instanceLink
        });
        instance.save((err, instance) => {
            if (err) {
            } else {
                let currentInstanceId = instance._id;
                Instance.findOne({isHome: true}, (err, homeInstance) => {
                    if (err) {
                    } else {
                        let homeInstanceId = homeInstance._id;
                        cloneAccomplishment(currentInstanceId, homeInstanceId, (err, accomplishment) => {
                            if (err) {
                            } else {
                                cloneAssessRisk(currentInstanceId, homeInstanceId, (err, assessRisk) => {
                                    if (err) {
                                    } else {
                                        cloneFutureGoal(currentInstanceId, homeInstanceId, (err, futureGoal) => {
                                            if (err) {
                                            } else {
                                                cloneHome(currentInstanceId, homeInstanceId, (err, home) => {
                                                    if (err) {
                                                    } else {
                                                        cloneCategory(currentInstanceId, homeInstanceId, (err, done) => {
                                                            if (err) {
                                                            } else {
                                                                cloneMyPlan(currentInstanceId, homeInstanceId, (err, myPlan) => {
                                                                    if (err) {
                                                                    } else {
                                                                        cloneSiteUserSignUp(currentInstanceId, homeInstanceId, (err, siteUserSignUp) => {
                                                                            if (err) {
                                                                            } else {
                                                                                cloneCard(currentInstanceId, homeInstanceId, (err, cards) => {
                                                                                    if (err) {
                                                                                    } else {
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
                });
            }
        });
    }
};

let updateInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink,
        instanceIdParam = req.params.instanceId;
        id = req.body.id || instanceIdParam;
    Instance.findById(id, (err, instance) => {
        if (err) {
        } else {
            instance.instanceName = instanceName || instance.instanceName;
            instance.companyName = companyName || instance.companyName;
            instance.instanceLink = instanceLink || instance.instanceLink;
            instance.save((err, instance) => {
                if (err) {
                } else {
                    res.redirect('/instances/createSelectInstances');
                }
            });
        }
    });
};

let changeInstanceActivation = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
    } else {
        Instance.findById(id, (err, instance) => {
            if (err) {
            } else {
                instance.isActive = !instance.isActive;
                instance.save((err, instance) => {
                    if (err) {
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
    } else {
        Instance.findByIdAndRemove(id, (err, instance) => {
            if (err) {
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

let cloneSiteUserSignUp = (currentInstanceId, homeInstanceId, cb) => {
    SiteUserSignUp.findOne({instanceId: homeInstanceId}, (err, siteUserSignUp) => {
        if (err) {
            return cb (err, null);
        } else {
            let newSiteUserSignUp = new SiteUserSignUp({
                instanceId: currentInstanceId,
                headerText: siteUserSignUp.headerText,
                beforeAge: siteUserSignUp.beforeAge,
                afterAge: siteUserSignUp.afterAge,
                beforeGender: siteUserSignUp.beforeGender,
                beforeZip: siteUserSignUp.beforeZip,
                buttonText: siteUserSignUp.buttonText,
                yearRow: siteUserSignUp.yearRow,
                genderRow: siteUserSignUp.genderRow,
                zipRow: siteUserSignUp.zipRow
            });
            newSiteUserSignUp.save((err, siteUserSignUp) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, siteUserSignUp);
                }
            });
        }
    });
};

let cloneAccomplishment = (currentInstanceId, homeInstanceId, cb) => {
    Accomplishment.findOne({instanceId: homeInstanceId}, (err, accomplishment) => {
        if (err) {
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
            return cb (err, null);
        } else {
            let newAssessRisk = new AssessRisk({
                instanceId: currentInstanceId,
                headerText: assessRisk.headerText,
                paragraphText: assessRisk.paragraphText,
                subHeaderText: assessRisk.subHeaderText,
                buttonText: assessRisk.buttonText,
                buttonLink: assessRisk.buttonLink,
                workInfoRow: assessRisk.workInfoRow,
                incomeRow: assessRisk.incomeRow,
                heightWeightRow: assessRisk.heightWeightRow,
                smokeRow: assessRisk.smokeRow,
                healthIssueRow: assessRisk.healthIssueRow,
                retireAgeRow: assessRisk.retireAgeRow
            });
            newAssessRisk.save((err, assessRisk) => {
                if (err) {
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
                        return cb (err, null);
                    } else {
                        cloneOptions(currentCategory._id, newCategory._id, currentInstanceId, homeInstanceId, (err, val) => {
                            if (err) {
                                return cb (err, null);
                            } else {
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
        if (options.length == 0) {
            return cb (null, 'done');
        } else if (err) {
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
                        return cb (err, null);
                    } else {
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
            return cb (err, null);
        } else {
            let newMyPlan = new MyPlan({
                instanceId: currentInstanceId,
                headerText: myPlan.headerText,
                subHeaderText: myPlan.subHeaderText,
                complement: myPlan.complement,
                finalInstruction: myPlan.finalInstruction,
                bottomButtonText: myPlan.bottomButtonText,
                bottomButtonLink: myPlan.bottomButtonLink,
                bottomButtonVisibility: myPlan.bottomButtonVisibility
            });
            newMyPlan.save((err, myPlan) => {
                if (err) {
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
            Instance.findOne({isHome: true}, (err, instance) => {
                if (err) {
                    return cb (err, null);
                } else {
                    return cb (null, instance);
                }
            });
        } else {
            if (!instance) {
                Instance.findOne({isHome: true}, (err, instance) => {
                    if (err) {
                        return cb (err, null);
                    } else {
                        return cb (null, instance);
                    }
                });
            } else {
                return cb (null, instance);
            }
        }
    });
};

let cloneCard = (currentInstanceId, homeInstanceId, cb) => {

    Card.find({instanceId: homeInstanceId}, (err, cards) => {
        if (err) {
            return cb (err, null);
        } else {
            if (cards.lelngth == 0) {
                return cb (null, cards);
            } else {
                for (let index=0; index<cards.length; index++) {
                    let currentCard = cards[index];
                    let newCard = new Card ({
                        instanceId: currentInstanceId,
                        cardName: currentCard.cardName,
                        headerText: currentCard.headerText,
                        subHeaderText: currentCard.subHeaderText,
                        cardBody: currentCard.cardBody,
                        isVisible: currentCard.isVisible
                    });
                    console.log('Card Index: ' + index);
                    newCard.save((err, newCard) => {
                        if (err) {
                            return cb (err, null);
                        } else {
                            cloneCardButton(currentInstanceId, homeInstanceId, currentCard._id, newCard._id, (err, cardButtons) => {
                                if (err) {
                                    return cb (err, null);
                                } else {
                                    if (index == (cards.length - 1)) {
                                        return cb (null, cards);
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    });
};

let cloneCardButton = (currentInstanceId, homeInstanceId, currentCardId, newCardId, cb) => {
    CardButton.find({instanceId: homeInstanceId, cardId: currentCardId }, (err, cardButtons) => {
        if (err) {
            return cb (err, null);
        } else {
            console.log('Card Button length: ' + cardButtons.length);
            if (cardButtons.length == 0) {
                return cb (null, cardButtons);
            } else {
                for (let index=0; index<cardButtons.length; index++) {
                    let currentCardButton = cardButtons[index];
                    let newCardButton = new CardButton ({
                        instanceId: currentInstanceId,
                        cardId: newCardId,
                        buttonName: currentCardButton.buttonName,
                        buttonUrl: currentCardButton.buttonUrl,
                        buttonText: currentCardButton.buttonText,
                        isVisible: currentCardButton.isVisible,
                        cardName: currentCardButton.cardName
                    });
                    newCardButton.save((err, cardButton) => {
                        if (err) {
                            return cb (err, null);
                        } else {
                            if (index == (cardButtons.length - 1)) {
                                return cb (null, cardButtons);
                            }
                        }
                    });
                }
            }
        }
    });
};

let cardButtonsInfo = (cardButtons, cb) => {
    if (cardButtons.length == 0) {
        return cb(null, cardButtons);
    } else {
        for (let index=0; index<cardButtons.length; index++) {
            Card.findById(cardButtons[index].cardId, (err, card) => {
                if (err) {
                    return cb (err, null);
                } else {
                    cardButtons[index].cardName = card.cardName;
                    if (index == (cardButtons.length - 1)) {
                        return cb (null, cardButtons);
                    }
                }
            });
        }
    }
};

let getCardButton = (instanceId, cb) => {
    CardButton.find({instanceId: instanceId}, (err, cardButtons) => {
        if (err) {
            return cb (err, null);
        } else {
            cardButtonsInfo(cardButtons, (err, cardButtons) => {
                if (err) {
                    return cb (err, null);
                } else {
                    console.log('Getting card buttons');
                    console.log(cardButtons);
                    return cb (null, cardButtons);
                }
            });
        }
    });
};

