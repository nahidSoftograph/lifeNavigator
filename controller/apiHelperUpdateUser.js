let Instance = require('../models/instance'),
    Option = require('../models/option'),
    Home = require('../models/home'),
    SiteUserSignUp = require('../models/siteUserSignUp'),
    Accomplishment = require('../models/accomplishment'),
    AssessRisk = require('../models/assessRisk'),
    Industry = require('../models/industry'),
    Occupation = require('../models/occupation'),
    Sick = require('../models/sick'),
    MyPlan = require('../models/myPlan'),
    SiteUser = require('../models/siteUser'),
    SiteUserPiiData = require('../models/siteUserPiiData'),
    SiteUserNonPiiData = require('../models/siteUserNonPiiData'),
    Card = require('../models/card'),
    CardButton = require('../models/cardButton'),
    FutureGoal = require('../models/futureGoal');

let updateInstanceId = (req, res, next, userId, instanceId, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.instanceId = instanceId;
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.instanceId = instanceId;
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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

let updateInstanceName = (req, res, next, userId, instanceName, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.instanceName = instanceName;
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.instanceName = instanceName;
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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

let updateAccomplishmentOptionId = (req, res, next, userId, accomplishmentOptionId, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            getOption(accomplishmentOptionId, (err, option) => {
                siteUserNonPiiData.accomplishmentOptions.push(option.titlePast);
                siteUserNonPiiData.accomplishmentFullOptions.push(option);
                siteUserNonPiiData.events.push(eventDescription);
                siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                    if (err) {
                        return res.status(202).json({
                            success: false,
                            message: err
                        });
                    } else {
                        SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                            if (err) {
                                return res.status(202).json({
                                    success: false,
                                    message: err
                                });
                            } else {
                                siteUserPiiData.accomplishmentOptions.push(option.titlePast);
                                siteUserPiiData.events.push(eventDescription);
                                siteUserPiiData.accomplishmentFullOptions.push(option);
                                siteUserPiiData.save((err, siteUserPiiData) => {
                                    if (err) {
                                        return res.status(202).json({
                                            success: false,
                                            message: err
                                        });
                                    } else {
                                        return res.status(201).json({
                                            success: true,
                                            message: 'updated user data',
                                            siteUserPiiData: siteUserPiiData,
                                            siteUserNonPiiData: siteUserNonPiiData
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
};

let updateFutureGoalOptionId = (req, res, next, userId, futureGoalOptionId, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            getOption(futureGoalOptionId, (err, option) => {
                siteUserNonPiiData.futureGoalOptions.push(option.titleFuture);
                siteUserNonPiiData.futureGoalFullOptions.push(option);
                siteUserNonPiiData.events.push(eventDescription);
                siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                    if (err) {
                        return res.status(202).json({
                            success: false,
                            message: err
                        });
                    } else {
                        SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                            if (err) {
                                return res.status(202).json({
                                    success: false,
                                    message: err
                                });
                            } else {
                                siteUserPiiData.futureGoalOptions.push(option.titleFuture);
                                siteUserPiiData.events.push(eventDescription);
                                siteUserPiiData.futureGoalFullOptions.push(option);
                                siteUserPiiData.save((err, siteUserPiiData) => {
                                    if (err) {
                                        return res.status(202).json({
                                            success: false,
                                            message: err
                                        });
                                    } else {
                                        return res.status(201).json({
                                            success: true,
                                            message: 'updated user data',
                                            siteUserPiiData: siteUserPiiData,
                                            siteUserNonPiiData: siteUserNonPiiData
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
};

let updateHeightFeet = (req, res, next, userId, heightFeet, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.heightFeet = heightFeet;
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.heightFeet = heightFeet;
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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

let updateHeightInch = (req, res, next, userId, heightInch, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.heightInch = heightInch;
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.heightInch = heightInch;
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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

let updateWeight = (req, res, next, userId, weight, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.weight = weight;
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.weight = weight;
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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

let updateEventDescription = (req, res, next, userId, eventDescription) => {
    SiteUserNonPiiData.findById(userId, (err, siteUserNonPiiData) => {
        if (err) {
            return res.status(202).json({
                success: false,
                message: err
            });
        } else {
            siteUserNonPiiData.events.push(eventDescription);
            siteUserNonPiiData.save((err, siteUserNonPiiData) => {
                if (err) {
                    return res.status(202).json({
                        success: false,
                        message: err
                    });
                } else {
                    SiteUserPiiData.findById(siteUserNonPiiData.referencePiiId, (err, siteUserPiiData) => {
                        if (err) {
                            return res.status(202).json({
                                success: false,
                                message: err
                            });
                        } else {
                            siteUserPiiData.events.push(eventDescription);
                            siteUserPiiData.save((err, siteUserPiiData) => {
                                if (err) {
                                    return res.status(202).json({
                                        success: false,
                                        message: err
                                    });
                                } else {
                                    return res.status(201).json({
                                        success: true,
                                        message: 'updated user data',
                                        siteUserPiiData: siteUserPiiData,
                                        siteUserNonPiiData: siteUserNonPiiData
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
  updateInstanceId,
    updateInstanceName,
    updateAccomplishmentOptionId,
    updateFutureGoalOptionId,
    updateHeightFeet,
    updateHeightInch,
    updateWeight,
    updateEventDescription

};

let getOption = (optionId, cb) => {
    Option.findById(optionId, (err, option) => {
        if (err) {
            return cb (err, null);
        } else {
            return cb (null, option);
        }
    });
};
