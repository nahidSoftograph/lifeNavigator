let Json2csvParser = require('json2csv').Parser,
    fs = require('fs'),
    SiteUser = require('../models/siteUser'),
    SiteUserPiiData = require('../models/siteUserPiiData'),
    SiteUserNonPiiData = require('../models/siteUserNonPiiData'),
    path = require('path'),
    Instance = require('../models/instance');

const fields = ['createdDate', 'instanceName', 'id', 'age', 'gender', 'zip', 'futureGoalOptions', 'accomplishmentOptions', 'occupation', 'industry', 'income', 'heightFeet', 'heightInch', 'weight', 'isSmoke', 'healthIssue', 'retireAge', 'events', 'finalStep'];
const json2csvParser = new Json2csvParser({ fields });

let displayCsvGeneratorForm = (req, res, next) => {
    Instance.find({}, (err, instances) => {
        if (err) {

        } else {
            res.render('csvGenerator', {
                instances: instances
            });
        }
    });
};

let generateCSV = (req, res, next) => {
    SiteUser.find(
        { createdDate: {
            /*$gte: new Date('2018-07-18T07:41:02.815Z'),
            $lte: new Date('2018-07-18T07:27:52.055Z'),*/
                $gte: new Date('2018-07-18T00:00:00.000Z'),
                $lte: new Date('2018-08-18T00:00:00.000Z'),
        }
    }, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log(siteUsers);
            formatUser(siteUsers, (err, siteUsers) => {
                console.log('After formating: ');
                console.log(siteUsers);
                const csv = json2csvParser.parse(siteUsers);

                console.log(csv);

                fs.writeFile('public/csvFiles/file.csv', csv, function(err) {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: 'Fatal server err: ' + err
                        });
                    } else {
                        res.download(path.join(__dirname, '../public/csvFiles/file.csv'));
                    }
                });
            });
        }
    });
};

let generateFilteredCsv = (req, res, next) => {
    let instanceId = req.body.instanceId,
        startDate = req.body.startDate + 'T00:00:00.000Z',
        endDate = req.body.endDate + 'T12:00:00.000Z';

    console.log('instanceId: ' + instanceId);
    console.log('startDate: ' + startDate);
    console.log('endDate: ' + endDate);

    SiteUserPiiData.find(
        { createdDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            }, instanceId: instanceId
        }, (err, siteUsers) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log(siteUsers);
                formatUser(siteUsers, (err, siteUsers) => {
                    console.log('After formating: ');
                    console.log(siteUsers);
                    const csv = json2csvParser.parse(siteUsers);

                    console.log(csv);

                    fs.writeFile('public/csvFiles/file.csv', csv, function(err) {
                        if (err) {
                            return res.status(400).json({
                                success: false,
                                message: 'Fatal server err: ' + err
                            });
                        } else {
                            res.download(path.join(__dirname, '../public/csvFiles/file.csv'));
                        }
                    });
                });
            }
        });
};

module.exports = {
  generateCSV,
  generateFilteredCsv,
  displayCsvGeneratorForm
};

let formatUser = (siteUsers, cb) => {
    let formatedUsers = [];
    if (siteUsers.length == 0) {
        return cb (null, []);
    }
    for (let index=0; index<siteUsers.length; index++) {
        let currentSiteUsers = siteUsers[index];

        let lengthArray = [];

        let allAccomplishmentGoalOptions = currentSiteUsers.accomplishmentOptions;
        let allFutureGoalOptions = siteUsers[index].futureGoalOptions;
        let allHealthIssues = siteUsers[index].healthIssue;
        let allEvents = siteUsers[index].events;

        lengthArray.push (allAccomplishmentGoalOptions.length);
        lengthArray.push (allFutureGoalOptions.length);
        lengthArray.push (allHealthIssues.length);
        lengthArray.push (allEvents.length);

        findMax(lengthArray, (err, maxVal) => {
            if (maxVal == 0) {
                let myObject = {
                    instanceName: currentSiteUsers.instanceName || '',
                    createdDate: currentSiteUsers.createdDate || '',
                    occupation: currentSiteUsers.occupation || '',
                    industry: currentSiteUsers.industry || '',
                    income: currentSiteUsers.income || '',
                    heightFeet: currentSiteUsers.heightFeet || '',
                    heightInch: currentSiteUsers.heightInch || '',
                    weight: currentSiteUsers.weight || '',
                    isSmoke: currentSiteUsers.isSmoke || '',
                    id: currentSiteUsers._id || '',
                    age: currentSiteUsers.age || '',
                    gender: currentSiteUsers.gender || '',
                    zip: currentSiteUsers.zip || '',
                    accomplishmentOptions: '',
                    futureGoalOptions: '',
                    finalStep: 'Start'
                };
                formatedUsers.push(myObject);
            } else {
                for (let index2=0; index2<maxVal; index2++) {
                    let myObject = {
                        instanceName: currentSiteUsers.instanceName || '',
                        createdDate: currentSiteUsers.createdDate || '',
                        occupation: currentSiteUsers.occupation || '',
                        industry: currentSiteUsers.industry || '',
                        income: currentSiteUsers.income || '',
                        heightFeet: currentSiteUsers.heightFeet || '',
                        heightInch: currentSiteUsers.heightInch || '',
                        weight: currentSiteUsers.weight || '',
                        isSmoke: currentSiteUsers.isSmoke || '',
                        id: currentSiteUsers._id || '',
                        age: currentSiteUsers.age || '',
                        gender: currentSiteUsers.gender || '',
                        zip: currentSiteUsers.zip || '',
                        accomplishmentOptions: allAccomplishmentGoalOptions[index2] || '',
                        futureGoalOptions: allFutureGoalOptions[index2] || '',

                        healthIssue: allHealthIssue[index2] || '',
                        events: allEvents[index2] || '',
                    };
                    formatedUsers.push(myObject);
                }
            }
            if (index == (siteUsers.length - 1)) {
                return cb (null, formatedUsers);
            }
        });
    }
};

let findMax = (myArray, cb) => {
    if (myArray.length == 0) {
        return cb (null, 0);
    } else {
        let maxVal = 0;
        for (let index=0; index<myArray.length; index++) {
            if (myArray[index] > maxVal) {
                maxVal = myArray[index];
            }
            if (index == (myArray.length - 1)) {
                return cb (null, maxVal);
            }
        }
    }
};