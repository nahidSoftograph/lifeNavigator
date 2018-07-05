let express = require('express'),
    Option = require('../models/option'),
    optionController = require('../controller/option'),
    multer = require('multer'),
    router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/optionLogo/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

router.post('/create', upload.single('image'), (req, res, next) => {
    let optionName = req.body.optionName,
        instanceId = req.body.instanceId,
        catId = req.body.catId,
        categoryId = req.body.categoryId,
        optId = req.body.optId,
        titlePast = req.body.titlePast,
        titleFuture = req.body.titleFuture,
        callBackURL = req.body.callBackURL;

    console.log('Category Id');
    console.log(catId);

    if (!optionName) {
        console.log('Invalid option name.');
    } else if (!categoryId) {
        console.log('Invalid category id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!catId) {
        console.log('Invalid catId.');
    } else if (!optId) {
        console.log('Invalid optId.');
    } else if (!titlePast) {
        console.log('Invalid titlePast.');
    } else if (!titleFuture) {
        console.log('Invalid titleFuture.');
    } else if (!callBackURL) {
        console.log('Invalid callBackURL');
    } else {
        let option = new Option({
            instanceId: instanceId,
            optionName: optionName,
            categoryId: categoryId,
            catId: catId,
            optId: optId,
            titlePast: titlePast,
            titleFuture: titleFuture,
            iconPath: '/images/optionLogo/' + req.file.filename
        });
        option.save((err, option) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('New option');
                console.log(option);
                res.redirect(callBackURL);
            }
        });
    }

});
router.post('/alterVisibility/:id', optionController.alterVisibility);
router.post('/update/:id', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    let id = req.params.id,
        optionName = req.body.optionName,
        titlePast = req.body.titlePast,
        titleFuture = req.body.titleFuture,
        callBackURL = req.body.callBackURL;

    if (!id) {
        console.log('Invalid id');
    } else if (!optionName) {
        console.log('Invalid option name');
    } else if (!titlePast) {
        console.log('Invalid title past');
    } else if (!callBackURL) {
        console.log('Invalid call back url');
    } else if (!titleFuture) {
        console.log('Invalid title future');
    } else {
        Option.findById(id, (err, option) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                option.optionName = optionName || option.optionName;
                option.titlePast = titlePast || option.titlePast;
                option.titleFuture = titleFuture || option.titleFuture;
                console.log(req.file);
                if (typeof req.file != 'undefined') {
                    option.iconPath = '/images/optionLogo/' + req.file.filename;
                }
                option.save((err, option) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Updated option');
                        console.log(option);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
});
router.post('/delete/:id', optionController.deleteOption);

module.exports = router;