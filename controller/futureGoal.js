let FutureGoal = require('../models/futureGoal');

let displayFutureGoal = (req, res, next) => {
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        console.log('Invalid Instance id');
    } else {
        FutureGoal.findOne({instanceId: instanceId}, (err, futureGoal) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                res.render('instanceSite/futureGoal', { instanceId: instanceId, futureGoal: futureGoal });
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
                        console.log('updated Future Goal');
                        console.log(futureGoal);
                        res.redirect('/futureGoal/display/' + instanceId);
                    }
                });
            }
        });
    }
};

module.exports = {
  displayFutureGoal,
  createFutureGoal,
  updateFutureGoal
};