let mongoose = require('mongoose');

let goalSchema = mongoose.Schema({
    goalText: { type: String, required: true },
    instanceId: { type: String, required: true },
    categoryId: { type: String, required: true },
    goalVisibility: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Goal', goalSchema);