let express = require('express'),
    homePageController = require('../controller/homePage'),
    multer = require('multer'),
    Home = require('../models/home'),
    router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/logo')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

router.post('/display/:id', homePageController.displayHomePage);
router.post('/update/:id', upload.single('image'), (req, res, next) => {
    let id = req.params.id,
        instanceId = req.body.instanceId,
        welComeText = req.body.welComeText,
        header = req.body.header,
        info = req.body.info,
        anchorText = req.body.anchorText,
        anchorLink = req.body.anchorLink,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink;

    if (!id) {
        console.log('Invalid id');
    } else if (!instanceId) {
        console.log('Invalid instance id');
    } else if (!welComeText) {
        console.log('Invalid  wellcome text');
    } else if (!header) {
        console.log('Invalid header');
    } else if (!info) {
        console.log('Invalid info');
    } else if (!anchorText) {
        console.log('Invalid anchor text');
    } else if (!anchorLink) {
        console.log('Invalid anchor link');
    } else if (!buttonText) {
        console.log('Invalid button text');
    } else if (!buttonLink) {
        console.log('Invalid button link');
    } else {

        Home.findById(id, (err, home) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                home.instanceId = instanceId || home.instanceId;
                home.welComeText = req.body.welComeText || home.welComeText;
                home.header = req.body.header || home.header;
                home.info = req.body.info || home.info;
                home.anchorText = req.body.anchorText || home.anchorText;
                home.anchorLink = req.body.anchorLink || home.anchorLink;
                home.buttonText = req.body.buttonText || home.buttonText;
                home.buttonLink = req.body.buttonLink || home.buttonLink;
                if (typeof req.file != 'undefined') {
                    home.logoPath = '/images/logo/' + req.file.filename || home.logoPath;
                }
                home.save((err, home) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Successfully updated');
                        res.redirect('/instances/createSelectInstances');
                        // res.render('defaultSite/homePage', {'title': 'Home Page', defaultHome: home});
                    }
                });
            }
        });
    }
});

module.exports = router;