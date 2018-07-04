let Occupation = require('../models/occupation');

let createOccupation = (req, res, next) => {
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
        let occupation = new Occupation ({
            instanceId: instanceId,
            name: name,
            text: text,
            isVisible: true
        });
        occupation.save((err, occupation) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Occupation created.');
                console.log(occupation);
                res.redirect(callBackURL);
            }
        });
    }
};

let updateOccupation = (req, res, next) => {
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
        Occupation.findById(id, (err, occupation) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                occupation.text = text || occupation.text;
                occupation.save((err, occupation) => {
                    if (err) {
                        conosole.log('Error: ' + err);
                    } else {
                        console.log('occupation updated');
                        console.log(occupation);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
};

let deleteOccupation = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Occupation.findByIdAndRemove(id, (err, occupation) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Occupation deleted.');
                console.log(occupation);
                res.redirect(callbackUrl);
            }
        });
    }
};

let alterOccupationVisibility = (req, res, next) => {
    let id = req.params.id,
        callbackUrl = req.body.callBackURL;
    if (!id) {
        console.log('Invalid id');
    } else if (!callbackUrl) {
        console.log('Invalid call back url');
    } else {
        Occupation.findById(id, (err, occupation) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                occupation.isVisible = !occupation.isVisible;
                occupation.save((err, occupation) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('occupation visibility altered.');
                        console.log(occupation);
                        res.redirect(callbackUrl);
                    }
                });
            }
        });
    }
};

module.exports = {
  createOccupation,
  updateOccupation,
  deleteOccupation,
  alterOccupationVisibility
};