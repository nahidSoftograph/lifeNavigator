let Industry = require('../models/industry');

let createIndustry = (req, res, next) => {
    let instanceId = req.body.instanceId,
        name = req.body.name,
        text = req.body.text,
        callBackURL = req.body.callBackURL;

    if (!instanceId) {
        console.log('Invalid instance Id');
    } else if (!name) {
        console.log('Invalid name')
    } else if (!text) {
        console.log('Invalid text');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else {
        let industry = new Industry ({
            instanceId: instanceId,
            name: name,
            text: text,
            isVisible: true
        });
        industry.save((err, industry) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Industry created.');
                console.log(industry);
                res.redirect(callBackURL);
            }
        });
    }
};

let updateIndustry = (req, res, next) => {
    let id = req.params.id,
        instanceId = req.body.instanceId,
        name = req.body.name,
        text = req.body.text,
        callBackURL = req.body.callBackURL;
    if (!instanceId) {
        console.log('Invalid instance Id');
    } else if (!name) {
        console.log('Invalid name')
    } else if (!text) {
        console.log('Invalid text');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else if (!id) {
        console.log('Invalid industry id');
    } else {
        Industry.findById(id, (err, industry) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                industry.text = text || industry.text;
                industry.save((err, industry) => {
                    if (err) {
                        conosole.log('Error: ' + err);
                    } else {
                        console.log('Industry updated');
                        console.log(industry);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

let deleteIndustry = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Industry.findByIdAndRemove(id, (err, industry) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Industry deleted.');
                console.log(industry);
                res.redirect(callbackUrl);
            }
        });
    }
};

let alterIndustryVisibility = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Industry.findById(id, (err, industry) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                industry.isVisible = !industry.isVisible;
                industry.save((err, industry) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Industry visibility altered.');
                        console.log(industry);
                        res.redirect(callbackUrl);
                    }
                });
            }
        });
    }
};

module.exports = {
  createIndustry,
  updateIndustry,
  deleteIndustry,
  alterIndustryVisibility
};