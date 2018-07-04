let AssessRisk = require('../models/assessRisk');

let createAssessRisk = (req, res, next) => {
    let instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        paragraphText = req.body.paragraphText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        callBackURL = req.body.callBackURL;
    if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!paragraphText) {
        conosole.log('Invalid paragraph text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else {
        let assessRisk = new AssessRisk({
            instanceId: instanceId,
            headerText: headerText,
            paragraphText: paragraphText,
            subHeaderText: subHeaderText,
            buttonText: buttonText,
            buttonLink: buttonLink
        });
        assessRisk.save((err, assessRisk) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Creating assessRisk');
                console.log(assessRisk);
                res.redirect(callBackURL);
            }
        });
    }
};

let updateAssessRisk = (req, res, next) => {
    let id  = req.params.id,
        instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        paragraphText = req.body.paragraphText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        callBackURL = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!paragraphText) {
        conosole.log('Invalid paragraph text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else {
        AssessRisk.findById(id, (err, assessRisk) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                assessRisk.headerText = headerText || assessRisk.headerText;
                assessRisk.paragraphText = paragraphText || assessRisk.paragraphText;
                assessRisk.subHeaderText = subHeaderText || assessRisk.subHeaderText;
                assessRisk.buttonText = buttonText || assessRisk.buttonText;
                assessRisk.buttonLink = buttonLink || assessRisk.buttonLink;
                assessRisk.save((err, assessRisk) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('updated assessRisk');
                        console.log(assessRisk);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

let deleteAssessRisk = (req, res, next) => {

};

module.exports = {
  createAssessRisk,
  updateAssessRisk,
  deleteAssessRisk
};