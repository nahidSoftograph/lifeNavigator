let Instance = require('../models/instance'),
    Home = require('../models/home'),
    customUtilController = require('../controller/customUtil');

let displayHomePage = (req, res, next) => {
    let callBackURL = req.body.callBackURL,
        id = req.params.id;
    if (!id) {
        console.log('Invalid Id');
        res.redirect(callBackURL);
    }
    Instance.findById(id, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            Home.findOne({instanceId: instance._id}, (err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    res.render('instanceSite/homePage', {
                        'title': 'Custom Instance',
                        home: home,
                        instanceId: id,
                        messages: req.flash('info')
                    });
                }
            });
        }
    });
};

let displayHomePageGet = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        console.log('Invalid Id');
    }
    Instance.findById(id, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            Home.findOne({instanceId: instance._id}, (err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    let successMessage = req.flash('success'),
                        infoMessage = req.flash('info'),
                        warningMessage = req.flash('warning'),
                        errorMessage = req.flash('error');
                    res.locals.successMessages = successMessage;
                    res.locals.infoMessages = infoMessage;
                    res.locals.warningMessages = warningMessage;
                    res.locals.errorMessages = errorMessage;
                    res.render('instanceSite/homePage', {
                        'title': 'Custom Instance',
                        home: home,
                        instanceId: id
                    });
                }
            });
        }
    });
};

let updateHomePage = (req, res, next) => {

};

module.exports = {
  displayHomePage,
  displayHomePageGet
};