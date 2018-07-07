let SiteUser = require('../models/siteUser'),
    Option = require('../models/option');

let displaySiteUser = (req, res, next) => {
    SiteUser.find({}, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log(siteUsers.length);
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

module.exports = {
  displaySiteUser
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