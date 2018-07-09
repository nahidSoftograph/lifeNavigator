let Option = require('../models/option'),
    Category = require('../models/category');

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

let alterVisibilityGet = (req, res, next) => {
    let id = req.params.id,
        callBackURL = req.body.callBackURL;

    Option.findById(id, (err, option) => {
        if (err) {
            console.log('Error: ' + err);
            res.status(202).json({
                success: false,
                message: err
            });
        } else {
            option.isVisible = !option.isVisible;
            option.save((err, option) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Update view');
                    console.log(option);

                    // res.redirect(callBackURL);
                    res.status(202).json({
                        success: false,
                        option: option
                    });
                }
            });
        }
    });
};

let cookOptions = (instanceId, cb) => {
    Option.find({instanceId: instanceId}, (err, options) => {
        if (err) {
            console.log('Error: ' + err);
            return cb (err, null);
        } else {
            updateOptionsCategory(options, (err, options) => {
                if (err) {
                    console.log('Error: ' + err);
                    return cb (err, null);
                } else {
                    return cb (null, options);
                }
            });
        }
    });
};

module.exports = {
    createOption,
    updateOption,
    deleteOption,
    alterVisibility,
    alterVisibilityGet,
    cookOptions
};

let updateOptionsCategory = (options, cb) => {
    console.log('Update option category');
    console.log(options.length);
    if (options.length == 0) {
        return cb (null, options);
    } else {
        for (let index=0; index<options.length; index++) {
            let categoryId = options[index].categoryId;
            console.log('Option name');
            console.log(options[index].optionName);
            Category.findById(categoryId, (err, category) => {
                if (err) {
                    return cb (err, null);
                } else {
                    options[index].categoryName = category.name;
                    if (index == (options.length - 1)) {
                        return cb (null, options);
                    }
                }
            });
        }
    }
};