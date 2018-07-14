let AssessRisk = require('../models/assessRisk');

let displayAssessRisk = (req, res, next) => {
    console.log('assess risk');

    let instanceId = req.params.instanceId;

    AssessRisk.findOne({instanceId: instanceId}, (err, assessRisk) => {
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
            res.render('instanceSite/assessRisk', {
                instanceId: instanceId,
                assessRisk: assessRisk
            });
        }
    });
};

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
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!headerText) {
        console.log('Invalid header text');
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!paragraphText) {
        console.log('Invalid paragraph text');
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!buttonText) {
        console.log('Invalid button text');
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!buttonLink) {
        console.log('Invalid button link');
        res.status(202).json({
            message: 'Invalid instance id'
        });
    } else if (!callBackURL) {
        console.log('Invalid call back url');
        res.status(202).json({
            message: 'Invalid call back url'
        });
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
                res.status(201).json({
                    instanceId: instanceId,
                    assessRisk: assessRisk
                });
            }
        });
    }
};

let updateAssessRisk = (req, res, next) => {
    console.log(req.body);
    let id  = req.params.id,
        instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        paragraphText = req.body.paragraphText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        callBackURL = req.body.callBackURL,

        workInfoRow = req.body.workInfoRow,
        incomeRow = req.body.incomeRow,
        heightWeightRow = req.body.heightWeightRow,
        smokeRow = req.body.smokeRow,
        healthIssueRow = req.body.healthIssueRow,
        retireAgeRow = req.body.retireAgeRow;

    if (!id) {
        console.log('Invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!paragraphText) {
        console.log('Invalid paragraph text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else if ((workInfoRow === incomeRow) || (workInfoRow === heightWeightRow) ||  (workInfoRow === smokeRow) ||  (workInfoRow === healthIssueRow) ||  (workInfoRow === retireAgeRow) ||
        (incomeRow === heightWeightRow) || (incomeRow === smokeRow) || (incomeRow === healthIssueRow) || (incomeRow === retireAgeRow) ||
        (heightWeightRow === smokeRow) || (heightWeightRow === healthIssueRow) || (heightWeightRow === retireAgeRow) ||
        (smokeRow === healthIssueRow) || (smokeRow === retireAgeRow) ||
        (healthIssueRow === retireAgeRow)) {
        return res.status(202).json({
            success: false,
            message: "invalid form row"
        });
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

                assessRisk.workInfoRow = workInfoRow || assessRisk.workInfoRow;
                assessRisk.incomeRow = incomeRow || assessRisk.incomeRow;
                assessRisk.heightWeightRow = heightWeightRow || assessRisk.heightWeightRow;
                assessRisk.smokeRow = smokeRow || assessRisk.smokeRow;
                assessRisk.healthIssueRow = healthIssueRow || assessRisk.healthIssueRow;
                assessRisk.retireAgeRow = retireAgeRow || assessRisk.retireAgeRow;

                assessRisk.save((err, assessRisk) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        req.flash('success', 'Successfully updated the Assess Risk page.');
                        res.redirect('/assessRisk/display/' + instanceId);
                    }
                });
            }
        });
    }
};

let updateEditInstanceAssessRisk = (req, res, next) => {
    console.log(req.body);
    let id  = req.params.id,
        instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        paragraphText = req.body.paragraphText,
        subHeaderText = req.body.subHeaderText,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink,
        callBackURL = req.body.callBackURL,

        workInfoRow = req.body.workInfoRow,
        incomeRow = req.body.incomeRow,
        heightWeightRow = req.body.heightWeightRow,
        smokeRow = req.body.smokeRow,
        healthIssueRow = req.body.healthIssueRow,
        retireAgeRow = req.body.retireAgeRow;
    if (!id) {
        console.log('Invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!headerText) {
        console.log('Invalid header text');
    } else if (!paragraphText) {
        console.log('Invalid paragraph text');
    } else if (!subHeaderText) {
        console.log('Invalid sub header text');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else if ((workInfoRow == incomeRow) || (workInfoRow == heightWeightRow) ||  (workInfoRow == smokeRow) ||  (workInfoRow == healthIssueRow) ||  (workInfoRow == retireAgeRow) ||
        (incomeRow == heightWeightRow) || (incomeRow == smokeRow) || (incomeRow == healthIssueRow) || (incomeRow == retireAgeRow) ||
        (heightWeightRow == smokeRow) || (heightWeightRow == healthIssueRow) || (heightWeightRow == retireAgeRow) ||
        (smokeRow == healthIssueRow) || (smokeRow == retireAgeRow) ||
        (healthIssueRow == retireAgeRow)) {
        return res.status(202).json({
            success: false,
            message: "invalid form row"
        });
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

                assessRisk.workInfoRow = workInfoRow || assessRisk.workInfoRow;
                assessRisk.incomeRow = incomeRow || assessRisk.incomeRow;
                assessRisk.heightWeightRow = heightWeightRow || assessRisk.heightWeightRow;
                assessRisk.smokeRow = smokeRow || assessRisk.smokeRow;
                assessRisk.healthIssueRow = healthIssueRow || assessRisk.healthIssueRow;
                assessRisk.retireAgeRow = retireAgeRow || assessRisk.retireAgeRow;

                assessRisk.save((err, assessRisk) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        req.flash('success', 'Successfully updated the Assess Risk page.');
                        res.redirect('/instances/editInstances/' + instanceId);
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
  updateEditInstanceAssessRisk,
  deleteAssessRisk,
  displayAssessRisk
};