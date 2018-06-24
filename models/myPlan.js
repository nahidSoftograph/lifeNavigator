let mongoose = require('mongoose');

let MyPlanSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    complements: { type: [String] },
    finalInstruction: { type: String, required: true }
});

module.exports = mongoose.model('MyPlan', MyPlanSchema);