let mongoose = require('mongoose');

let assessRiskSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    paragraphText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true }

    /*beforeIndustry: { type: String, required: true },
    afterIndustry: { type: String, required: true },
    beforeIncome: { type: String, required: true },
    afterIncome: { type: String, required: true },
    heightWeightSection1: { type: String, required: true },
    heightWeightSection2: { type: String, required: true },
    heightWeightSection3: { type: String, required: true },
    heightWeightSection4: { type: String, required: true },
    smokeSection1: { type: String, required: true },
    smokeSection2: { type: String, required: true },
    beforeRetireAge: { type: String, required: true },*/
});

module.exports = mongoose.model('AssessRisks', assessRiskSchema);