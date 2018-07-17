let mongoose = require('mongoose');

let siteUserPiiSchema = mongoose.Schema({
    instanceId: { type: String, required: false },
    instanceName: { type: String, required: false },

    age: { type: String, required: false },
    gender: { type: String, required: false },
    zip: { type: String, required: false },

    accomplishmentOptions: [String],
    futureGoalOptions: [String],
    accomplishmentFullOptions: [],
    futureGoalFullOptions: [],

    occupation: { type: String, required: false },
    industry: { type: String, required: false },
    income: { type: String, required: false },
    heightFeet: { type: String, required: false },
    heightInch: { type: String, required: false },
    weight: { type: String, required: false },
    isSmoke: { type: Boolean, required: false },
    healthIssue: [],
    retireAge: { type: String, required: false },

    events: [],

    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteUserPii', siteUserPiiSchema);