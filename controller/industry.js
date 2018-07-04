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

let updateIndustry = () => {

};

let deleteIndustry = () => {

};

module.exports = {
  createIndustry,
  updateIndustry,
  deleteIndustry
};