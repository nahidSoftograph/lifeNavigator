let Sick = require('../models/sick');

let createSick = (req, res, next) => {
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
        let sick = new Sick ({
            instanceId: instanceId,
            name: name,
            text: text,
            isVisible: true
        });
        sick.save((err, sick) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Sick created.');
                console.log(sick);
                res.redirect(callBackURL);
            }
        });
    }
};

let updateSick = (req, res, next) => {

};

let deleteSick = (req, res, next) => {

};

module.exports = {
  createSick,
  updateSick,
  deleteSick
};