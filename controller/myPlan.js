let MyPlan = require('../models/myPlan');

let displayMyPlan = (req, res, next) => {
    console.log('in making plan');
    let instanceId = req.params.instanceId;
    if (!instanceId) {
        console.log('Invalid instance id.');
    } else {
        MyPlan.findOne({instanceId: instanceId}, (err, myPlan) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log(myPlan);
                res.render('instanceSite/myPlan', {
                    instanceId: instanceId,
                    myPlan: myPlan
                });
            }
        });
    }
};

let createMyPlan = (req, res, next) => {
    let instanceId = req.body.instanceId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        complement = req.body.complement,
        finalInstruction = req.body.finalInstruction;

    if (!instanceId) {
        res.status(202).json({
            success: false,
            message: 'Invalid instance id'
        });
    } else if (!headerText) {
        res.status(202).json({
            success: false,
            message: 'Invalid header text'
        });
    } else if (!subHeaderText) {
        res.status(202).json({
            success: false,
            message: 'Invalid sub header text'
        });
    } else if (!complement) {
        res.status(202).json({
            success: false,
            message: 'Invalid complement'
        });
    } else if (!finalInstruction) {
        res.status(202).json({
            success: false,
            message: 'Invalid final instruection'
        });
    } else {
        let myPlan = new MyPlan({
            instanceId: instanceId,
            headerText: headerText,
            subHeaderText: subHeaderText,
            complement: complement,
            finalInstruction: finalInstruction
        });
        myPlan.save((err, myPlan) => {
            if (err) {
                res.status(202).json({
                    success: false,
                    err: err
                });
            } else {
                res.status(201).json({
                    success: true,
                    data: myPlan
                });
            }
        });
    }
};

let updateMyPlan = (req, res, next) => {
    let id = req.params.myPlanId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        complement = req.body.complement,
        finalInstruction = req.body.finalInstruction;

    if (!id) {
        res.status(202).json({
            success: false,
            message: 'Invalid id'
        });
    } else if (!headerText) {
        res.status(202).json({
            success: false,
            message: 'Invalid header text'
        });
    } else if (!subHeaderText) {
        res.status(202).json({
            success: false,
            message: 'Invalid sub header text'
        });
    } else if (!complement) {
        res.status(202).json({
            success: false,
            message: 'Invalid complement'
        });
    } else if (!finalInstruction) {
        res.status(202).json({
            success: false,
            message: 'Invalid final instruection'
        });
    } else {
        MyPlan.findById(id, (err, myPlan) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
               myPlan.headerText = headerText || myPlan.headerText;
               myPlan.subHeaderText = subHeaderText || myPlan.subHeaderText;
               myPlan.complement = complement || myPlan.complement;
               myPlan.finalInstruction = finalInstruction || myPlan.finalInstruction;
               myPlan.save((err, myPlan) => {
                   if (err) {
                       console.log('Errro: ' + err);
                   } else {
                        console.log('Updated the my plan');
                        res.redirect('/myPlan/display/' + myPlan.instanceId);
                   }
               });
            }
        });
    }
};

module.exports = {
  displayMyPlan,
  createMyPlan,
  updateMyPlan
};