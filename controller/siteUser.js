let SiteUser = require('../models/siteUser'),
    SiteUserPiiData = require('../models/siteUserPiiData'),
    SiteUserNonPiiData = require('../models/siteUserNonPiiData'),
    Option = require('../models/option');

let displaySiteUser = (req, res, next) => {
    SiteUser.find({}, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            cookUser(siteUsers, (err, siteUsers) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    res.render('siteUser', {siteUsers: siteUsers});
                }
            });
        }
    });
};

let displaySiteUserPiiData = (req, res, next) => {
    SiteUserPiiData.find({}, (err, siteUsersPiiData) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('siteUserData/siteUserPiiData', {
                siteUsers: siteUsersPiiData
            });
        }
    });
};

let displaySiteUserNonPiiData = (req, res, next) => {
    SiteUserNonPiiData.find({}, (err, siteUsersNonPiiData) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('siteUserData/siteUserNonPiiData', {
                siteUsers: siteUsersNonPiiData
            });
        }
    });
};

let displayIndividualSiteUser = (req, res, next) => {
    let id = req.params.siteUserNonPiiDataId;
    console.log('Id: ' + id);
    SiteUserNonPiiData.findById(id, (err, siteUserNonPiiData) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('siteUserData/individualSiteUser', {
                siteUser: siteUserNonPiiData
            });
        }
    });
};

let deleteUser = (req, res, next) => {
    let siteUserId = req.params.siteUserId;
    if (!siteUserId) {
        console.log('Invalid site user id');
    } else {
        SiteUser.findByIdAndRemove(siteUserId, (err, siteUser) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                res.redirect('/siteUser/display');
            }
        });
    }
};

module.exports = {
  displaySiteUser,
  displaySiteUserPiiData,
  displaySiteUserNonPiiData,
  displayIndividualSiteUser,
  deleteUser
};

let cookUser = (siteUsers, cb) => {
    if (siteUsers.length == 0) {
        return cb (null, siteUsers);
    } else {
        for (let index=0; index<siteUsers.length; index++) {
            let currentSiteUser = siteUsers[index];
            getAllOptions(currentSiteUser.accomplishmentOptions, (err, accomplishmentFullOptions) => {
                if (err) {
                    return cb (err, null);
                } else {
                    getAllOptions(currentSiteUser.futureGoalOptions, (err, futureGoalFullOptions) => {
                        if (err) {
                            return cb (err, null);
                        } else {
                            siteUsers[index].accomplishmentFullOptions = accomplishmentFullOptions;
                            siteUsers[index].futureGoalFullOptions = futureGoalFullOptions;
                            if (index == (siteUsers.length - 1)) {
                                return cb (null, siteUsers);
                            }
                        }
                    });
                }
            });
        }
    }
};

let getAllOptions = (optionsId, cb) => {
    let options = [];
    if (optionsId.length == 0) {
        return cb (null, options);
    } else {
        for (let index=0; index<optionsId.length; index++) {
            let currentOptionId = optionsId[index];
            Option.findById(currentOptionId, (err, option) => {
                if (err) {
                    return cb (err, null);
                } else {
                    options.push(option);
                    if (index == (optionsId.length - 1)) {
                        return cb (null, options);
                    }
                }
            });
        }
    }
};