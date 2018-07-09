let Accomplishment = require('../models/accomplishment'),
    categoryController = require('../controller/category'),
    optionController = require('../controller/option')
    Category = require('../models/category');

let displayAccomplishment = (req, res, next) => {
    let instanceId = req.params.instanceId;

    if (!instanceId) {
        console.log('Invalid instance id');
    } else {
        Accomplishment.findOne({instanceId: instanceId}, (err, accomplishment) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                optionController.cookOptions(instanceId, (err, options) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Options');
                        console.log(options);
                        res.render('instanceSite/accomplishment', {
                            instanceId: instanceId,
                            options: options,
                            accomplishment: accomplishment
                        });
                    }
                });
            }
        });
    }
};

let createAccomplishment = (req, res, next) => {

};

let updateAccomplishment = (req, res, next) => {
    let accomplishmentId = req.params.accomplishmentId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        instanceId = req.body.instanceId,
        buttonLink = req.body.buttonLink;
    if (!accomplishmentId) {
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
        Accomplishment.findById(accomplishmentId, (err, accomplishment) => {
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
                        res.redirect('/accomplishment/display/' + instanceId);
                    }
                });
            }
        });
    }
};

let updateEditInstanceAccomplishment = (req, res, next) => {
    let accomplishmentId = req.params.accomplishmentId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        instanceId = req.body.instanceId,
        buttonLink = req.body.buttonLink;
    if (!accomplishmentId) {
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
        Accomplishment.findById(accomplishmentId, (err, accomplishment) => {
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
                        res.redirect('/instances/editInstances/' + instanceId);
                    }
                });
            }
        });
    }
};

module.exports = {
  displayAccomplishment,
  createAccomplishment,
  updateAccomplishment,
  updateEditInstanceAccomplishment
};