let express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    goalController = require('../controller/goal'),
    Goal = require('../models/goal'),
    Category = require('../models/category');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/goalLogo/accomplishment/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({storage: storage});

router.post('/create', upload.single('image'), (req, res, next) => {
    let goalText = req.body.goalText,
        goalName = req.body.goalName,
        categoryId = req.body.categoryId,
        callBackURL = req.body.callBackURL;
    if (!goalText) {
        console.log('Invalid goal text');
    } else if (!goalName) {
        console.log('Invalid goal name');
    } else if (!categoryId) {
        console.log('Invalid category id');
    } else {
        console.log(req.file);
        Category.findById(categoryId, (err, category) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                let instanceId = category.parentSectionId;
                let goal = new Goal({
                    goalName: goalName,
                    goalText: goalText,
                    goalIconPath: '/images/goalLogo/accomplishment/' + req.file.filename,
                    instanceId: instanceId,
                    categoryId: categoryId
                });
                goal.save((err, goal) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log(goal);
                        res.redirect(callBackURL);
                    }
                });
            }
        });
    }
});

router.post('/update/:id', upload.single('image'), (req, res, next) => {});
router.post('/delete', goalController.deleteGoal);
router.post('/alterVisibility/:goalId', goalController.alterGoalVisibility);

module.exports = router;
