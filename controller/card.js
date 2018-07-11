let Card = require('../models/card');

let createCard = (req, res, next) => {
    let instanceId = req.params.instanceId,
        headerText = req.body.headerText,
        subHeaderText = req.body.subHeaderText,
        cardBody = req.body.cardBody;
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
    } else if (!cardBody) {
        res.status(202).json({
            success: false,
            message: 'Invalid card body'
        });
    } else {
        let card = new Card({
            instanceId: instanceId,
            headerText: headerText,
            subHeaderText: subHeaderText,
            cardBody: cardBody
        });
        card.save((err, card) => {
            if (err) {
                res.status(202).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Created the card',
                    data: card
                });
            }
        });
    }
};

module.exports = {
  createCard
};