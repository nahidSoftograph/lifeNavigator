let CardButton = require('../models/cardButton');

let createCardButton = (req, res, next) => {
    let instanceId = req.body.instanceId,
        cardId = req.body.cardId,
        buttonName = req.body.buttonName,
        buttonUrl = req.body.buttonUrl,
        buttonText = req.body.buttonText;
    if (!instanceId) {
        res.status(202).json({
            success: false,
            message: 'Invalid instance id'
        });
    } else if (!cardId) {
        res.status(202).json({
            success: false,
            message: 'Invalid card id'
        });
    } else if (!buttonName) {
        res.status(202).json({
            success: false,
            message: 'Invalid button name'
        });
    } else if (!buttonUrl) {
        res.status(202).json({
            success: false,
            message: 'Invalid button url'
        });
    } else if (!buttonText) {
        res.status(202).json({
            success: false,
            message: 'Invalid button text'
        });
    } else {
        let cardButton = new CardButton ({
            instanceId: instanceId,
            cardId: cardId,
            buttonName: buttonName,
            buttonUrl: buttonUrl,
            buttonText: buttonText
        });
        cardButton.save((err, cardButton) => {
            if (err) {
                res.status(202).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Button Created',
                    data: cardButton
                });
            }
        });
    }
};

let updateCardButton = (req, res, next) => {
    let cardButtonId = req.params.cardButtonId,
        instanceId = req.body.instanceId,
        cardId = req.body.cardId,
        buttonName = req.body.buttonName,
        buttonUrl = req.body.buttonUrl,
        buttonText = req.body.buttonText;
    if (!cardButtonId) {
        console.log('Invalid card button id');
    } else {
        CardButton.findById(cardButtonId, (err, cardButton) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                cardButton.cardId =  cardId || cardButton.cardId;
                cardButton.buttonName = buttonName || cardButton.buttonName;
                cardButton.buttonUrl = buttonUrl || cardButton.buttonUrl;
                cardButton.buttonText = buttonText || cardButton.buttonText;
                cardButton.save((err, cardButton) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Card Button updated');
                    }
                });
            }
        });
    }
};

let alterVisibility = (req, res, next) => {
    let cardButtonId = req.params.cardButtonId;
    if (!cardButtonId) {
        console.log('Invalid card button id');
    } else {
        CardButton.findById(cardButtonId, (err, cardButton) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                cardButton.isVisible = !cardButton.isVisible;
                cardButton.save((err, cardButton) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Card Button visibility changed');
                    }
                });
            }
        });
    }
};

module.exports = {
    createCardButton,
    updateCardButton,
    alterVisibility
};