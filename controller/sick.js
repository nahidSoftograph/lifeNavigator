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
        Sick.findById(id, (err, sick) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                sick.text = text || sick.text;
                sick.save((err, sick) => {
                    if (err) {
                        conosole.log('Error: ' + err);
                    } else {
                        console.log('sick updated');
                        console.log(sick);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

let deleteSick = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Sick.findByIdAndRemove(id, (err, sick) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('sick deleted.');
                console.log(sick);
                res.redirect(callbackUrl);
            }
        });
    }
};

let alterSickVisibility = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Sick.findById(id, (err, sick) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                sick.isVisible = !sick.isVisible;
                sick.save((err, sick) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('sick visibility altered.');
                        console.log(sick);
                        res.redirect(callbackUrl);
                    }
                });
            }
        });
    }
};

module.exports = {
  createSick,
  updateSick,
  deleteSick,
  alterSickVisibility
};