let express = require('express'),
    router = express.Router(),
    defaultSiteController = require('../controller/defaultSite'),
    Home = require('../models/home'),
    Instance = require('../models/instance');
    multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/logo')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

router.get('/homePage', defaultSiteController.renderHomePage);
router.get('/accomplishments', defaultSiteController.renderAccomplishments);
router.post('/accomplishments', defaultSiteController.createAccomplishment);
router.post('/updateAccomplishment/:id', defaultSiteController.updateAccomplishment);

router.get('/futureGoals', defaultSiteController.renderFutureGoals);
router.post('/createFutureGoal', defaultSiteController.createFutureGoal);
router.post('/updateFutureGoal/:id', defaultSiteController.updateFutureGoal);

router.get('/assessRisk', defaultSiteController.renderAssessRisk);
router.get('/myPlan', defaultSiteController.renderMyPlan);

router.post('/homePage', upload.single('image'), (req, res, next) => {
    let welComeText = req.body.welComeText,
        header = req.body.header,
        info = req.body.info,
        anchorText = req.body.anchorText,
        anchorLink = req.body.anchorLink,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink;

    if (!welComeText) {
        console.log('Invalid well come text');
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

        Instance.findOne({isHome: true}, (err, instance) => {
            if (err) {
                console.log('Error ' + err);
            } else {
                let home = new Home({
                    instanceId: instance._id,
                    welComeText: req.body.welComeText,
                    header: req.body.header,
                    info: req.body.info,
                    anchorText: req.body.anchorText,
                    anchorLink: req.body.anchorLink,
                    buttonText: req.body.buttonText,
                    buttonLink: req.body.buttonLink,
                    logoPath: '/images/logo/' + req.file.filename
                });
                home.save((err, home) => {
                    if (err) {

                    } else {
                        res.render('defaultSite/homePage', {'title': 'Home Page', defaultHome: home});
                    }
                });
            }
        });
    }
});

router.post('/updateHomePage/:id', upload.single('image'), (req, res, next) => {
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
                        res.redirect('/homePage/display/' + id);
                        // res.render('defaultSite/homePage', {'title': 'Home Page', defaultHome: home});
                    }
                });
            }
        });
    }
});

module.exports = router;