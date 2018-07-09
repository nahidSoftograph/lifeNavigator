let Instance = require('../models/instance'),
    Home = require('../models/home');

let displayHomePage = (req, res, next) => {
    let callBackURL = req.body.callBackURL,
        id = req.params.id;
    if (!id) {
        console.log('Invalid Id');
        res.redirect(callBackURL);
    }
    Instance.findById(id, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Custom Instance');
            console.log(instance);
            Home.findOne({instanceId: instance._id}, (err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Got Home Page');
                    console.log(home);
                    res.render('instanceSite/homePage', {'title': 'Custom Instance', home: home, instanceId: id});
                }
            });
        }
    });
};

let displayHomePageGet = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        console.log('Invalid Id');
    }
    Instance.findById(id, (err, instance) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Custom Instance');
            console.log(instance);
            Home.findOne({instanceId: instance._id}, (err, home) => {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Got Home Page');
                    console.log(home);
                    res.render('instanceSite/homePage', {'title': 'Custom Instance', home: home, instanceId: id});
                }
            });
        }
    });
};

let updateHomePage = (req, res, next) => {

};

module.exports = {
  displayHomePage,
  displayHomePageGet
};