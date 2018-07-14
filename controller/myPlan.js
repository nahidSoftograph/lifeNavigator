let MyPlan = require('../models/myPlan'),
    CardButton = require('../models/cardButton'),
    Card = require('../models/card');

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
                CardButton.find({instanceId: instanceId}, (err, cardButtons) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Pre card Buttons');
                        console.log(cardButtons);
                        cardButtonsInfo(cardButtons, (err, cardButtons) => {
                            if (err) {
                                console.log('Error: ' + err);
                            } else {
                                let successMessage = req.flash('success'),
                                    infoMessage = req.flash('info'),
                                    warningMessage = req.flash('warning'),
                                    errorMessage = req.flash('error');
                                res.locals.successMessages = successMessage;
                                res.locals.infoMessages = infoMessage;
                                res.locals.warningMessages = warningMessage;
                                res.locals.errorMessages = errorMessage;
                                res.render('instanceSite/myPlan', {
                                    instanceId: instanceId,
                                    myPlan: myPlan,
                                    cardButtons: cardButtons
                                });
                            }
                        });
                    }
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
        finalInstruction = req.body.finalInstruction,
        bottomButtonText = req.body.bottomButtonText,
        bottomButtonLink = req.body.bottomButtonLink,
        bottomButtonVisibility = req.body.bottomButtonVisibility;

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
               myPlan.bottomButtonText = bottomButtonText || myPlan.bottomButtonText;
               myPlan.bottomButtonLink = bottomButtonLink || myPlan.bottomButtonLink;
               if (typeof bottomButtonVisibility != 'undefined') {
                   myPlan.bottomButtonVisibility = bottomButtonVisibility;
               }
               myPlan.save((err, myPlan) => {
                   if (err) {
                       console.log('Errro: ' + err);
                   } else {
                       req.flash('success', 'Successfully updated the Save My Plan page.');
                        res.redirect('/myPlan/display/' + myPlan.instanceId);
                   }
               });
            }
        });
    }
};

let updateEditInstanceMyPlan = (req, res, next) => {
    let id = req.params.myPlanId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        complement = req.body.complement,
        finalInstruction = req.body.finalInstruction,
        bottomButtonText = req.body.bottomButtonText,
        bottomButtonLink = req.body.bottomButtonLink,
        bottomButtonVisibility = req.body.bottomButtonVisibility;

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
                myPlan.bottomButtonText = bottomButtonText || myPlan.bottomButtonText;
                myPlan.bottomButtonLink = bottomButtonLink || myPlan.bottomButtonLink;
                if (typeof bottomButtonVisibility != 'undefined') {
                    myPlan.bottomButtonVisibility = bottomButtonVisibility;
                }
                myPlan.save((err, myPlan) => {
                    if (err) {
                        console.log('Errro: ' + err);
                    } else {
                        req.flash('success', 'Successfully updated the Save My Plan page.');
                        res.redirect('/instances/editInstances/' + myPlan.instanceId);
                    }
                });
            }
        });
    }
};

module.exports = {
  displayMyPlan,
  createMyPlan,
  updateMyPlan,
  updateEditInstanceMyPlan
};

let cardButtonsInfo = (cardButtons, cb) => {
    console.log('Card Length: ' + cardButtons.length);
    if (cardButtons.length == 0) {
        return cb(null, cardButtons);
    } else {
        for (let index=0; index<cardButtons.length; index++) {
            Card.findById(cardButtons[index].cardId, (err, card) => {
                if (err) {
                    return cb (err, null);
                } else {
                    cardButtons[index].cardName = card.cardName;
                    console.log('Card Name ' + index);
                    console.log(cardButtons[index].cardName);
                    if (index == (cardButtons.length - 1)) {
                        return cb (null, cardButtons);
                    }
                }
            });
        }
    }
};