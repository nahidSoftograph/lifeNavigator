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
router.get('/futureGoals', defaultSiteController.renderFutureGoals);
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

    } else if (!header) {

    } else if (!info) {

    } else if (!anchorText) {

    } else if (!anchorLink) {

    } else if (!buttonText) {

    } else if (!buttonLink) {

    } else {

        Instance.findOne({isHome: true}, (err, instance) => {
            if (err) {

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
router.post('/updateHomePage', upload.single('image'), (req, res, next) => {
    let instanceId = req.body.instanceId,
        welComeText = req.body.welComeText,
        header = req.body.header,
        info = req.body.info,
        anchorText = req.body.anchorText,
        anchorLink = req.body.anchorLink,
        buttonText = req.body.buttonText,
        buttonLink = req.body.buttonLink;

    if (!instanceId) {

    } else if (!welComeText) {

    } else if (!header) {

    } else if (!info) {

    } else if (!anchorText) {

    } else if (!anchorLink) {

    } else if (!buttonText) {

    } else if (!buttonLink) {

    } else {
        console.log(req.file);
        let home = new Home({
            instanceId: instanceId,
            welComeText: req.body.welComeText,
            header: req.body.header,
            info: req.body.info,
            anchorText: req.body.anchorText,
            anchorLink: req.body.anchorLink,
            buttonText: req.body.buttonText,
            buttonLink: req.body.buttonLink,
            logoPath: 'public/images/logo/' + req.file.filename
        });
        home.save((err, home) => {
            if (err) {

            } else {
                res.render('defaultSite/homePage', {'title': 'Home Page', defaultHome: home});
            }
        });
    }
});

module.exports = router;