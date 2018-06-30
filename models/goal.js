let mongoose = require('mongoose');

let goalSchema = mongoose.Schema({
    goalName: { type: String, required: true },
    goalText: { type: String, required: true },
    goalIconPath: { type: String, required: true },
    instanceId: { type: String, required: true },
    categoryId: { type: String, required: true },
    goalVisibility: { type: Boolean, required: true, default: true }
});

module.exports = mongoose.model('Goal', goalSchema);