let Json2csvParser = require('json2csv').Parser,
    fs = require('fs'),
    SiteUser = require('../models/siteUser'),
    path = require('path');

let generateCSV = (req, res, next) => {
    const fields = ['id', 'age', 'gender', 'zip', 'futureGoalOptions', 'accomplishmentOptions'];
    const json2csvParser = new Json2csvParser({ fields });

    SiteUser.find(
        { createdDate: {
            /*$gte: new Date('2018-07-18T07:41:02.815Z'),
            $lte: new Date('2018-07-18T07:27:52.055Z'),*/
                $gte: new Date('2018-07-18T07:27:52.055Z'),
                $lte: new Date('2018-07-18T07:41:02.815Z'),
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

module.exports = {
  generateCSV
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
        lengthArray.push (allAccomplishmentGoalOptions.length);
        lengthArray.push (allFutureGoalOptions.length);

        findMax(lengthArray, (err, maxVal) => {
            if (maxVal == 0) {
                let myObject = {
                    id: currentSiteUsers._id || '',
                    age: currentSiteUsers.age || '',
                    gender: currentSiteUsers.gender || '',
                    zip: currentSiteUsers.zip || '',
                    accomplishmentOptions: '',
                    futureGoalOptions: ''
                };
                formatedUsers.push(myObject);
            } else {
                for (let index2=0; index2<maxVal; index2++) {
                    let myObject = {
                        id: currentSiteUsers._id || '',
                        age: currentSiteUsers.age || '',
                        gender: currentSiteUsers.gender || '',
                        zip: currentSiteUsers.zip || '',
                        accomplishmentOptions: allAccomplishmentGoalOptions[index2] || '',
                        futureGoalOptions: allFutureGoalOptions[index2] || ''
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