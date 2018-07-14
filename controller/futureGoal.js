let FutureGoal = require('../models/futureGoal'),
    Category = require('../models/category'),
    optionController = require('../controller/option'),
    categoryController = require('../controller/category');

let displayFutureGoal = (req, res, next) => {
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        console.log('Invalid Instance id');
    } else {
        FutureGoal.findOne({instanceId: instanceId}, (err, futureGoal) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                optionController.cookOptions(instanceId, (err, options) => {
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
                        res.render('instanceSite/futureGoal', {
                            instanceId: instanceId,
                            options: options,
                            futureGoal: futureGoal
                        });
                    }
                });
            }
        });
    }
};

let createFutureGoal = (req, res, next) => {

};

let updateFutureGoal = (req, res, next) => {
    let futureGoalId = req.params.futureGoalId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        instanceId = req.body.instanceId;

    if (!futureGoalId) {
        console.log('invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else {
        FutureGoal.findById(futureGoalId, (err, futureGoal) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                futureGoal.headerText = headerText|| futureGoal.headerText;
                futureGoal.subHeaderText = subHeaderText || futureGoal.subHeaderText;
                futureGoal.buttonText = buttonText || futureGoal.buttonText;
                futureGoal.buttonLink = buttonLink || futureGoal.buttonLink;
                futureGoal.save((err, futureGoal) => {
                    if (err) {
                        console.log('Error: ' + error);
                    } else {
                        req.flash('success', 'Successfully updated the Future Goal page.');
                        res.redirect('/futureGoal/display/' + instanceId);
                    }
                });
            }
        });
    }
};

let updateEditInstanceFutureGoal = (req, res, next) => {
    let futureGoalId = req.params.futureGoalId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        instanceId = req.body.instanceId;

    if (!futureGoalId) {
        console.log('invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else {
        FutureGoal.findById(futureGoalId, (err, futureGoal) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                futureGoal.headerText = headerText|| futureGoal.headerText;
                futureGoal.subHeaderText = subHeaderText || futureGoal.subHeaderText;
                futureGoal.buttonText = buttonText || futureGoal.buttonText;
                futureGoal.buttonLink = buttonLink || futureGoal.buttonLink;
                futureGoal.save((err, futureGoal) => {
                    if (err) {
                        console.log('Error: ' + error);
                    } else {
                        req.flash('success', 'Successfully updated the Future Goal page.');
                        res.redirect('/instances/editInstances/' + instanceId);
                    }
                });
            }
        });
    }
};

module.exports = {
  displayFutureGoal,
  createFutureGoal,
  updateFutureGoal,
  updateEditInstanceFutureGoal
};