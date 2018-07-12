let SiteUserSignUp = require('../models/siteUserSignUp');

let displaySiteUserSignUp = (req, res, next) => {
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        console.log('Invalid instance id.');
    } else {
        SiteUserSignUp.findOne({instanceId: instanceId}, (err, siteUserSignUp) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                res.render('instanceSite/siteUserSignUp', {
                    instanceId: instanceId,
                    siteUserSignUp: siteUserSignUp
                });
            }
        });
    }
};

let createSiteUserSignUp = (req, res, next) => {
    let instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        beforeAge = req.body.beforeAge,
        afterAge = req.body.afterAge,
        beforeGender = req.body.beforeGender,
        beforeZip = req.body.beforeZip,
        buttonText = req.body.buttonText;

    if (!instanceId) {
        console.log('Invalid instance id');
        return res.status(202).json({
            success: false,
            message: 'Invalid instance id'
        });
    } else if (!headerText) {
        console.log('Invalid header text');
        return res.status(202).json({
            success: false,
            message: 'Invalid header text'
        });
    } else if (!beforeAge) {
        console.log('Invalid before age');
        return res.status(202).json({
            success: false,
            message: 'Invalid before age'
        });
    } else if (!afterAge) {
        console.log('Invalid after age');
        return res.status(202).json({
            success: false,
            message: 'Invalid after age'
        });
    } else if (!beforeGender) {
        console.log('Invalid before gender');
        return res.status(202).json({
            success: false,
            message: 'Invalid before gender'
        });
    } else if (!beforeZip) {
        console.log('Invalid before zip');
        return res.status(202).json({
            success: false,
            message: 'Invalid before zip'
        });
    } else if (!buttonText) {
        console.log('Invalid button text');
        return res.status(202).json({
            success: false,
            message: 'Invalid button text'
        });
    } else {
        let siteUserSignUp = new SiteUserSignUp({
            instanceId: instanceId,
            headerText: headerText,
            beforeAge: beforeAge,
            afterAge: afterAge,
            beforeGender: beforeGender,
            beforeZip: beforeZip,
            buttonText: buttonText
        });
        siteUserSignUp.save((err, siteUserSignUp) => {
            if (err) {
                console.log('Error: ' + err);
                return res.status(202).json({
                    success: false,
                    message: err
                });
            } else {
                console.log('Site user sign up created');
                console.log(siteUserSignUp);
                return res.status(201).json({
                    success: true,
                    message: 'Sign up completed',
                    data: siteUserSignUp
                });
            }
        });
    }
};

let updateSiteUserSignUp = (req, res, next) => {
    console.log(req.body);
    let id = req.params.siteUserSignUpId,
        headerText = req.body.headerText,
        beforeAge = req.body.beforeAge,
        afterAge = req.body.afterAge,
        beforeGender = req.body.beforeGender,
        beforeZip = req.body.beforeZip,
        buttonText = req.body.buttonText,
        yearRow = req.body.yearRow,
        genderRow = req.body.genderRow,
        zipRow = req.body.zipRow;

    if (!id) {
        console.log('Invalid id');
        return res.status(202).json({
            success: false,
            message: 'Invalid instance id'
        });
    } else if (!headerText) {
        console.log('Invalid header text');
        return res.status(202).json({
            success: false,
            message: 'Invalid header text'
        });
    } else if (!beforeAge) {
        console.log('Invalid before age');
        return res.status(202).json({
            success: false,
            message: 'Invalid before age'
        });
    } else if (!afterAge) {
        console.log('Invalid after age');
        return res.status(202).json({
            success: false,
            message: 'Invalid after age'
        });
    } else if (!beforeGender) {
        console.log('Invalid before gender');
        return res.status(202).json({
            success: false,
            message: 'Invalid before gender'
        });
    } else if (!beforeZip) {
        console.log('Invalid before zip');
        return res.status(202).json({
            success: false,
            message: 'Invalid before zip'
        });
    } else if (!buttonText) {
        console.log('Invalid button text');
        return res.status(202).json({
            success: false,
            message: 'Invalid button text'
        });
    } else if ((yearRow == genderRow) || (yearRow == zipRow) || (yearRow == zipRow)) {
        console.log('Invalid row sequence');
        return res.status(202).json({
            success: false,
            message: 'Invalid row sequence'
        });
    } else {
        SiteUserSignUp.findById(id, (err, siteUserSignUp) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                siteUserSignUp.headerText = headerText || siteUserSignUp.headerText;
                siteUserSignUp.beforeAge = beforeAge || siteUserSignUp.beforeAge;
                siteUserSignUp.afterAge = afterAge || siteUserSignUp.afterAge;
                siteUserSignUp.beforeGender = beforeGender || siteUserSignUp.beforeGender;
                siteUserSignUp.beforeZip = beforeZip || siteUserSignUp.beforeZip;
                siteUserSignUp.buttonText = buttonText || siteUserSignUp.buttonText;
                siteUserSignUp.yearRow = yearRow || siteUserSignUp.yearRow;
                siteUserSignUp.genderRow = genderRow || siteUserSignUp.genderRow;
                siteUserSignUp.zipRow = zipRow || siteUserSignUp.zipRow;

                siteUserSignUp.save((err, siteUserSignUp) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Updated user');
                        console.log(siteUserSignUp);
                        res.redirect('/siteUserSignUp/display/' + siteUserSignUp.instanceId);
                    }
                });

            }
        });
    }
};

let deleteSiteUserSignUp = (req, res, next) => {

};

let updateEditInstanceSiteUserSignUp = (req, res, next) => {
    console.log(req.body);
    let id = req.params.siteUserSignUpId,
        headerText = req.body.headerText,
        beforeAge = req.body.beforeAge,
        afterAge = req.body.afterAge,
        beforeGender = req.body.beforeGender,
        beforeZip = req.body.beforeZip,
        buttonText = req.body.buttonText,
        yearRow = req.body.yearRow,
        genderRow = req.body.genderRow,
        zipRow = req.body.zipRow;

    if (!id) {
        console.log('Invalid id');
        return res.status(202).json({
            success: false,
            message: 'Invalid instance id'
        });
    } else if (!headerText) {
        console.log('Invalid header text');
        return res.status(202).json({
            success: false,
            message: 'Invalid header text'
        });
    } else if (!beforeAge) {
        console.log('Invalid before age');
        return res.status(202).json({
            success: false,
            message: 'Invalid before age'
        });
    } else if (!afterAge) {
        console.log('Invalid after age');
        return res.status(202).json({
            success: false,
            message: 'Invalid after age'
        });
    } else if (!beforeGender) {
        console.log('Invalid before gender');
        return res.status(202).json({
            success: false,
            message: 'Invalid before gender'
        });
    } else if (!beforeZip) {
        console.log('Invalid before zip');
        return res.status(202).json({
            success: false,
            message: 'Invalid before zip'
        });
    } else if (!buttonText) {
        console.log('Invalid button text');
        return res.status(202).json({
            success: false,
            message: 'Invalid button text'
        });
    } else if ((yearRow == genderRow) || (yearRow == zipRow) || (yearRow == zipRow)) {
        console.log('Invalid row sequence');
        return res.status(202).json({
            success: false,
            message: 'Invalid row sequence'
        });
    } else {
        SiteUserSignUp.findById(id, (err, siteUserSignUp) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                siteUserSignUp.headerText = headerText || siteUserSignUp.headerText;
                siteUserSignUp.beforeAge = beforeAge || siteUserSignUp.beforeAge;
                siteUserSignUp.afterAge = afterAge || siteUserSignUp.afterAge;
                siteUserSignUp.beforeGender = beforeGender || siteUserSignUp.beforeGender;
                siteUserSignUp.beforeZip = beforeZip || siteUserSignUp.beforeZip;
                siteUserSignUp.buttonText = buttonText || siteUserSignUp.buttonText;
                siteUserSignUp.yearRow = yearRow || siteUserSignUp.yearRow;
                siteUserSignUp.genderRow = genderRow || siteUserSignUp.genderRow;
                siteUserSignUp.zipRow = zipRow || siteUserSignUp.zipRow;

                siteUserSignUp.save((err, siteUserSignUp) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Updated user');
                        console.log(siteUserSignUp);
                        res.redirect('/instances/editInstances/' + siteUserSignUp.instanceId);
                    }
                });
            }
        });
    }
};

module.exports = {
  displaySiteUserSignUp,
  createSiteUserSignUp,
  updateSiteUserSignUp,
  updateEditInstanceSiteUserSignUp,
  deleteSiteUserSignUp
};