let Json2csvParser = require('json2csv').Parser,
    fs = require('fs'),
    SiteUser = require('../models/siteUser'),
    path = require('path');

let generateCSV = (req, res, next) => {

    SiteUser.find({}, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log(siteUsers);
            /*let myArray= [{
              "age": '12',
              'gender': 'male',
              'zip': '1234',
               'futureOption': ['a', 'b'],
               'accomplishmentOption': ['a', 'b'],
               'steps': ['a', 'b']
            }, {
                "age": '13',
                'gender': 'male',
                'zip': '12343',
                'futureOption': ['a', 'b', 'c'],
                'accomplishmentOption': ['a', 'b', 'e', 'f'],
                'steps': [{ 'a': '1', 'b': '2'}, {}],
            }];*/
            // let fields = ['age', 'gender', 'zip', 'futureOption', 'accomplishmentOption', 'steps'];
            let fields = ['_id', 'age', 'gender', 'zip', 'events', 'healthIssue', 'futureGoalFullOptions', 'accomplishmentFullOptions', 'futureGoalOptions', 'accomplishmentOptions'];
            // let fields = ['instanceId', 'instanceName', 'age', 'gender', 'zip', 'occupation', 'industry', 'income', 'heightFeet', 'heightInch', 'weight', 'isSmoke', 'retireAge'];
            const opts = {fields};
            /*unwind: ['events', 'healthIssue', 'futureGoalFullOptions', 'accomplishmentFullOptions', 'futureGoalOptions', 'accomplishmentOptions']*/
            // const opts = { fields, unwind: ['accomplishmentOptions', 'futureGoalOptions', 'accomplishmentFullOptions', 'futureGoalFullOptions', 'healthIssue', 'events'] };
            const parser = new Json2csvParser(opts);
            const csv = parser.parse(siteUsers);
            // const csv = parser.parse(myArray);
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
        }
    });
};

module.exports = {
  generateCSV
};