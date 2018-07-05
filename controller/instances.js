let Instance = require('../models/instance'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Category = require('../models/category'),
    FutureGoal = require('../models/futureGoal'),
    Home = require('../models/home'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Option = require('../models/option'),
    Sick = require('../models/sick');

let renderEditInstances = (req, res, next) => {
    res.render('instances/edit', {'title': 'Edit instances'});
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
                                console.log('New Instance Accomplishment: ');
                                console.log(accomplishment);
                                cloneAssessRisk(currentInstanceId, homeInstanceId, (err, assessRisk) => {
                                    if (err) {
                                        console.log('Error: ' + err);
                                    } else {
                                        console.log('Assess Risk Created');
                                        console.log(assessRisk);
                                        cloneFutureGoal(currentInstanceId, homeInstanceId, (err, futureGoal) => {
                                            if (err) {
                                                console.log('Error: ' + err);
                                            } else {
                                                console.log('Future Goal Created');
                                                console.log(futureGoal);
                                                cloneHome(currentInstanceId, homeInstanceId, (err, home) => {
                                                    if (err) {
                                                        console.log('Error: ' + err);
                                                    } else {
                                                        console.log('Cloned Home: ');
                                                        console.log(home);
                                                        cloneCategory(currentInstanceId, homeInstanceId, (err, done) => {
                                                            if (err) {
                                                                console.log('Error: ' + err);
                                                            } else {
                                                                console.log('Update the category');
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
    deleteInstance
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
                    console.log('New Accomplishment');
                    console.log(accomplishment);
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
                    console.log('Cloned assess Risk');
                    console.log(assessRisk);
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
                        cloneOptions(currentCategory._id, newCategory._id, (err, val) => {
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
                    console.log('new cloned Home');
                    console.log(home);
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
                    console.log('create future goal');
                    console.log(futureGoal);
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

let cloneOptions = (currentCategoryId, newCategoryId, cb) => {
    Option.find({catId: currentCategoryId}, (err, options) => {
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
                    catId: newCategoryId,
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