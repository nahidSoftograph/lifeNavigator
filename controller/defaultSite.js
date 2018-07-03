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
    console.log('Rendering accomplishments');
    Instance.findOne({isHome: true}, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            Accomplishment.findOne({instanceId: instance._id }, (err, accomplishment) => {
                if (err) {
                    console.log('Error: ' + err)    ;
                } else {
                    Category.find({}, (err, categories) => {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            console.log('Before traversing the categories.');
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

let updateAccomplishment = (req, res, next) => {
    let id = req.params.id,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink;
    if (!id) {
        console.log('invalid id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else {
        Accomplishment.findById(id, (err, accomplishment) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                accomplishment.headerText = headerText|| accomplishment.headerText;
                accomplishment.subHeaderText = subHeaderText || accomplishment.subHeaderText;
                accomplishment.buttonText = buttonText || accomplishment.buttonText;
                accomplishment.buttonLink = buttonLink || accomplishment.buttonLink;
                accomplishment.save((err, accomplishment) => {
                    if (err) {
                        console.log('Error: ' + error);
                    } else {
                        console.log('updated Accomplishment');
                        console.log(accomplishment);
                        res.redirect('/defaultSite/accomplishments');
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
    createAccomplishment,
    updateAccomplishment
};

let traverseAllCategories = (categories, cb) => {
    if (categories.length == 0) {
        return cb (null, categories);
    } else {
        for (let index=0; index<categories.length; index++) {
            Goal.find({catId: categories[index].catId}, (err, options) => {
                if (err) {
                    return cb (err, null);
                } else {
                    categories[index].options = options;
                    console.log('For category: ' + categories[index].categoryName);
                    console.log('  Goals ');
                    console.log(categories[index].goals);
                    if (categories.length - 1 == index) {
                        return cb (null, categories);
                    }
                }
            });
        }
    }
};