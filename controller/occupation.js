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

let updateOccupation = () => {

};

let deleteOccupation = () => {

};

module.exports = {
  createOccupation,
  updateOccupation,
  deleteOccupation
};