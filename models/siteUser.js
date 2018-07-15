let mongoose = require('mongoose');

let siteUserSchema = mongoose.Schema({
    instanceId: { type: String, required: false },
    instanceName: { type: String, required: false },
    age: { type: String, required: false },
    gender: { type: String, required: false },
    zip: { type: String, required: false },
    accomplishmentOptions: [String],
    futureGoalOptions: [String],
    accomplishmentFullOptions: [],
    futureGoalFullOptions: []
});

module.exports = mongoose.model('SiteUser', siteUserSchema);