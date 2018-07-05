let mongoose = require('mongoose');

let optionSchema = mongoose.Schema({
    optionName: { type: String, required: true },
    catId: { type: String, required: true },
    categoryId: { type: String, required: true },
    optId: { type: String, required: true },
    instanceId: { type: String, required: true },
    titlePast: { type: String, required: true },
    titleFuture: { type: String, required: true },
    selected: { type: Boolean, required: true, default: false },
    iconPath: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Option', optionSchema);