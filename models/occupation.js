let mongoose = require('mongoose');

let occupationSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Occupation', occupationSchema);