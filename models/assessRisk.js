let mongoose = require('mongoose');

let assessRiskSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    paragraphText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },

    workInfoRow: { type: String, required: true },
    incomeRow: { type: String, required: true },
    heightWeightRow: { type: String, required: true },
    smokeRow: { type: String, required: true },
    healthIssueRow: { type: String, required: true },
    retireAgeRow: { type: String, required: true },

    formFieldOrders: [],

    industry: [],
    occupation: [],
    healthIssue: []
});

module.exports = mongoose.model('AssessRisks', assessRiskSchema);