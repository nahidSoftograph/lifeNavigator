let mongoose = require('mongoose');

let siteUserSignUpSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    beforeAge: { type: String, required: true },
    afterAge: { type: String, required: true },
    beforeGender: { type: String, required: true },
    beforeZip: { type: String, required: true },
    buttonText: { type: String, required: true },
    yearRow: { type: String, required: true },
    genderRow: { type: String, required: true },
    zipRow: { type: String, required: true },
    formFieldOrders: []
});

module.exports = mongoose.model('SiteUserSignUp', siteUserSignUpSchema);