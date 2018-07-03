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
        catId = req.body.catId,
        optId = req.body.optId,
        titlePast = req.body.titlePast,
        titleFuture = req.body.titleFuture,
        callBackURL = req.body.callBackURL;

    console.log('Category Id');
    console.log(catId);

    if (!optionName) {
        console.log('Invalid option name.');
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
            optionName: optionName,
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
router.post('/update/:id', optionController.updateOption);

module.exports = router;