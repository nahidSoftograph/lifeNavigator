let mongoose = require('mongoose');

let industrySchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Industry', industrySchema);