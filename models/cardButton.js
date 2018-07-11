let mongoose = require('mongoose');

let cardButtonSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    cardId: { type: String, required: true },
    buttonName: { type: String, required: true },
    buttonUrl: { type: String, required: true },
    buttonText: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('CardButton', cardButtonSchema);