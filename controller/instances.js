let Instance = require('../models/instance'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Category = require('../models/category'),
    FutureGoal = require('../models/futureGoal'),
    Home = require('../models/home'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Option = require('../models/option'),
    Sick = require('../models/sick');

let renderEditInstances = (req, res, next) => {
    res.render('instances/edit', {'title': 'Edit instances'});
};

let renderCreateSelect = (req, res, next) => {
    Instance.find({}, (err, instances) => {
        if (err) {
            console.log(err);
        } else {
            res.render('instances/createSelect', {'title': 'Create Select Instances', instances: instances });
        }
    });
};

let createInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink;

    if (!instanceName) {
        console.log('Invalid instance name');
    } else if (!companyName) {
        console.log('Invalid company name');
    } else if (!instanceLink) {
        console.log('Invalid instance link');
    } else {
        let instance = new Instance({
            instanceName: instanceName,
            companyName: companyName,
            instanceLink: instanceLink
        });
        instance.save((err, instance) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/instances/createSelectInstances');
            }
        });
    }
};

let updateInstance = (req, res, next) => {
    let instanceName = req.body.instanceName,
        companyName = req.body.companyName,
        instanceLink = req.body.instanceLink,
        id = req.body.id;
    console.log(req.body);
    if (!instanceName) {

    } else if (!id) {

    } else if (!companyName) {

    } else if (!instanceLink) {

    } else {
        Instance.findById(id, (err, instance) => {
            if (err) {

            } else {
                instance.instanceName = instanceName || instance.instanceName;
                instance.companyName = companyName || instance.companyName;
                instance.instanceLink = instanceLink || instance.instanceLink;
                instance.save((err, instance) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/instances/createSelectInstances');
                    }
                });
            }
        });
    }
};

let changeInstanceActivation = (req, res, next) => {
    let id = req.params.id;

    if (!id) {

    } else {
        Instance.findById(id, (err, instance) => {
            if (err) {

            } else {
                instance.isActive = !instance.isActive;
                instance.save((err, instance) => {
                    if (err) {

                    } else {
                        res.redirect('/instances/createSelectInstances');
                    }
                });
            }
        });
    }
};

let deleteInstance = (req, res, next) => {
    let id = req.params.id;

    if (!id) {

    } else {
        Instance.findByIdAndRemove(id, (err, instance) => {
            if (err) {

            } else {
                res.redirect('/instances/createSelectInstances');
            }
        });
    }
};

module.exports = {
    renderEditInstances,
    renderCreateSelect,
    createInstance,
    updateInstance,
    changeInstanceActivation,
    deleteInstance
};

let cloneAccomplishment = (instanceId, cb) => {

};

let cloneAssessRisk = (instanceId, cb) => {

};

let cloneCategory = (instanceId, cb) => {

};

let cloneHomePage = (instanceId, cb) => {

};

let cloneFutureGoal = (instanceId, cb) => {

};

let cloneHome = (instanceId, cb) => {

};

let cloneIndustry = (instanceId, cb) => {

};

let cloneOccupation = (instanceId, cb) => {

};

let cloneOptions = (instanceId, cb) => {

};

let cloneSick = (instanceId, cb) => {

};