let Option = require('../models/option');

let createOption = (req, res, next) => {};

let updateOption = (req, res, next) => {

};

let deleteOption = (req, res, next) => {
    let id = req.params.id,
        callBackURL = req.body.callBackURL;

    if (!id) {
        console.log('invalid id.');
    } else if (!callBackURL) {
        console.log('invalid call back url');
    } else {
        Option.findByIdAndRemove(id, (err, option) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Deleted option');
                console.log(option);
                res.redirect(callBackURL);
            }
        });
    }
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