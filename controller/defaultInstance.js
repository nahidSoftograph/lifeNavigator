let Instance = require('../models/instance'),
    Home = require('../models/home'),
    SiteUserSignUp = require('../models/siteUserSignUp'),
    Accomplishment = require('../models/accomplishment'),
    FutureGoal = require('../models/futureGoal'),
    AssessRisk = require('../models/assessRisk'),
    MyPlan = require('../models/myPlan');

let getDefaultInstance = (req, res, next) => {
    Instance.findOne({isHome: true}, (err, homeInstance) => {
        if (err) {
            res.status.json({
                success: false,
                message: err
            });
        } else {
            let instanceId = homeInstance._id;
            getHomePageInformation(instanceId, (err, home) => {
                if (err) {
                    res.status.json({
                        success: false,
                        message: err
                    });
                } else {
                    getSiteUserSignUpInformation(instanceId, (err, siteUserSignUp) => {
                        if (err) {
                            res.status.json({
                                success: false,
                                message: err
                            });
                        } else {
                            getAccomplishmentInformation(instanceId, (err, accomplishment) => {
                                if (err) {
                                    res.status.json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    getFutureGoalInformation(instanceId, (err, futureGoal) => {
                                        if (err) {
                                            res.status.json({
                                                success: false,
                                                message: err
                                            });
                                        } else {
                                            getAssessRiskInformation(instanceId, (err, assessRisk) => {
                                                if (err) {
                                                    res.status.json({
                                                        success: false,
                                                        message: err
                                                    });
                                                } else {
                                                    getMyPlanInformation(instanceId, (err, myPlan) => {
                                                        if (err) {
                                                            res.status.json({
                                                                success: false,
                                                                message: err
                                                            });
                                                        } else {
                                                            res.status(201).json({
                                                                'title': 'Edit instances',
                                                                home: home,
                                                                siteUserSignUp: siteUserSignUp,
                                                                accomplishment: accomplishment,
                                                                futureGoal: futureGoal,
                                                                assessRisk: assessRisk,
                                                                myPlan: myPlan,
                                                                homeInstance: homeInstance
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports = {
  getDefaultInstance
};

let getHomePageInformation = (instanceId, cb) => {
    Home.findOne({instanceId: instanceId}, (err, home) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, home);
        }
    });
};

let getSiteUserSignUpInformation = (instanceId, cb) => {
    SiteUserSignUp.findOne({instanceId: instanceId}, (err, siteUserSignUp) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, siteUserSignUp);
        }
    });
};

let getAccomplishmentInformation = (instanceId, cb) => {
    Accomplishment.findOne({instanceId: instanceId}, (err, accomplishment) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, accomplishment);
        }
    });
};

let getFutureGoalInformation = (instanceId, cb) => {
    FutureGoal.findOne({instanceId: instanceId}, (err, futureGoal) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, futureGoal);
        }
    });
};

let getAssessRiskInformation = (instanceId, cb) => {
    AssessRisk.findOne({instanceId: instanceId}, (err, assessRisk) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, assessRisk);
        }
    });
};

let getMyPlanInformation = (instanceId, cb) => {
    MyPlan.findOne({instanceId: instanceId}, (err, myPlan) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, myPlan);
        }
    });
};