let Json2csvParser = require('json2csv').Parser,
    fs = require('fs'),
    SiteUser = require('../models/siteUser'),
    path = require('path');

let generateCSV = (req, res, next) => {
    /*var fields = [
        {
            age: String,
            gender: String,
            zip: String,
            accomplishmentOptions: [String],
            futureGoalOptions: [String],
            accomplishmentFullOptions: [
                {
                    optionName: String,
                    catId: String,
                    categoryId: String,
                    optId: String,
                    instanceId: String,
                    titlePast: String,
                    titleFuture: String,
                    selected: String,
                    iconPath: String,
                    isVisible: String,
                    categoryName: String
                }
            ],
            futureGoalFullOptions: [
                {
                    optionName: String,
                    catId: String,
                    categoryId: String,
                    optId: String,
                    instanceId: String,
                    titlePast: String,
                    titleFuture: String,
                    selected: String,
                    iconPath: String,
                    isVisible: String,
                    categoryName: String
                }
            ]
        }
    ];*/
    SiteUser.find({}, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            let myArray= [{
              "age": '12',
              'gender': 'male',
              'zip': '1234',
               'option': ['a', 'b']
            }];
            let fields = ['age', 'gender', 'zip', "option" ];
            const opts = { fields, unwind: 'option' };
            const parser = new Json2csvParser(opts);
            const csv = parser.parse(myArray);
            console.log('Generated Data');
            console.log(siteUsers);
            console.log('Generated CSV');
            console.log(csv);
            // var csv = json2csv({ data: siteUsers, fields: fields });
            /*fs.writeFile('public/csvFiles/file.csv', csv, function(err) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Fatal server err: ' + err
                    });
                } else {
                    res.download(path.join(__dirname, '../public/csvFiles/file.csv'));
                }
            });*/
        }
    });
};

module.exports = {
  generateCSV
};