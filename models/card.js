let mongoose = require('mongoose');

let cardSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    cardName: { type: String, required: true },
    headerText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    cardBody: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true },
    cardButtons: []
});

module.exports = mongoose.model('Card', cardSchema);