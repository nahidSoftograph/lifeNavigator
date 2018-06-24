let mongoose = require('mongoose');

let assessRiskSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    professionalField: { type: [String] },
    profession: { type: [String] },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    healthIssue: { type: [String] }
});

module.exports = mongoose.model('AssessRisks', assessRiskSchema);