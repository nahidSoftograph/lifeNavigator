let Instance = require('../models/instance'),
    Category = require('../models/category'),
    Goal = require('../models/goal'),
    Home = require('../models/home');
    Accomplishment = require('../models/accomplishment');

let renderHomePage = (req, res, next) => {
    Instance.findOne({isHome: true}, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Home Instance');
            console.log(instance);
            Home.findOne({instanceId: instance._id}, (err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Got Home Page');
                    console.log(home);
                    res.render('defaultSite/homePage', {'title': 'Home Page', home: home});
                }
            });
        }
    });
};

let createHomePage = (req, res, next) => {

};

let renderAccomplishments = (req, res, next) => {
    Instance.findOne({isHome: true}, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            Accomplishment.findOne({instanceId: instance._id }, (err, accomplishment) => {
                if (err) {
                    console.log('Error: ' + err)    ;
                } else {
                    Category.find({parentSectionId: accomplishment._id}, (err, categories) => {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            traverseAllCategories(categories, (err, categories) => {
                                if (err) {
                                    console.log('Error: ' + err);
                                } else {
                                    res.render('defaultSite/accomplishments', {
                                        title: 'Accomplishments',
                                        accomplishment: accomplishment,
                                        categories: categories
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

let createAccomplishment = (req, res, next) => {
    console.log('creating accomplishments');
    console.log(req.body);
    let headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink;
    if (!headerText) {
        console.log('Invalid header text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else {
        console.log('No error');
        Instance.findOne({isHome: true}, (err, instance) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Get the default instance');
                let accomplishment = new Accomplishment({
                    instanceId: instance._id,
                    headerText: headerText,
                    subHeaderText: subHeaderText,
                    buttonText: buttonText,
                    buttonLink: buttonLink
                });
                accomplishment.save((err, accomplishment) => {
                    if (err) {

                    } else {
                        console.log('Saved Accomplishment');
                        console.log(accomplishment);
                        res.render('defaultSite/accomplishments', {'title': 'Accomplishments'});
                    }
                });
            }
        });
    }
};

let renderFutureGoals = (req, res, next) => {
    res.render('defaultSite/futureGoals', {'title': 'Future Goals'});
};

let renderAssessRisk = (req, res, next) => {
    res.render('defaultSite/assessRisk', {'title': 'Assess Risk'});
};

let renderMyPlan = (req, res, next) => {
    res.render('defaultSite/myPlan', {'title': 'My Plan'});
};

module.exports = {
    renderHomePage,
    renderAccomplishments,
    renderFutureGoals,
    renderAssessRisk,
    renderMyPlan,
    createHomePage,
    createAccomplishment
};

let traverseAllCategories = (categories, cb) => {
    for (let index=0; index<categories.length; index++) {
        Goal.find({categoryId: categories[index]._id}, (err, goals) => {
            if (err) {
                return cb (err, null);
            } else {
                categories[index].goals = goals;
                console.log('For category: ' + categories[index].categoryName);
                console.log('  Goals ');
                console.log(categories[index].goals);
                if (categories.length - 1 == index) {
                    return cb (null, categories);
                }
            }
        });
    }
};