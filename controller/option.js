let Option = require('../models/option');

let createOption = (req, res, next) => {};

let updateOption = (req, res, next) => {

};

let deleteOption = (req, res, next) => {

};

let alterVisibility = (req, res, next) => {
    let id = req.params.id,
        callBackURL = req.body.callBackURL;

    Option.findById(id, (err, option) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            option.isVisible = !option.isVisible;
            option.save((err, option) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Update view');
                    console.log(option);

                    res.redirect(callBackURL);
                }
            });
        }
    });

};

module.exports = {
    createOption,
    updateOption,
    deleteOption,
    alterVisibility
};