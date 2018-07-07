let mongoose = require('mongoose');

let siteUserSchema = mongoose.Schema({
    age: { type: String, required: true },
    gender: { type: String, required: true },
    zip: { type: String, required: true },
    accomplishmentOptions: [String],
    futureGoalOptions: [String],
    accomplishmentFullOptions: [],
    futureGoalFullOptions: []
});

module.exports = mongoose.model('SiteUser', siteUserSchema);