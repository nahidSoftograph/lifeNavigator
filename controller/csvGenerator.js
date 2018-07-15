let Json2csvParser = require('json2csv').Parser,
    fs = require('fs'),
    SiteUser = require('../models/siteUser'),
    path = require('path');

let generateCSV = (req, res, next) => {

    SiteUser.find({}, (err, siteUsers) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            let myArray= [{
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
                'steps': ['a', 'b'],
            }];
            let fields = ['age', 'gender', 'zip', 'futureOption', 'accomplishmentOption', 'steps'];
            const opts = { fields, unwind: ['futureOption', 'accomplishmentOption', 'steps'] };
            const parser = new Json2csvParser(opts);
            const csv = parser.parse(myArray);
            console.log('Generated Data');
            console.log(siteUsers);
            console.log('Generated CSV');
            console.log(csv);
            // var csv = json2csv({ data: siteUsers, fields: fields });
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