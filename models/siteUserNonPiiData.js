let mongoose = require('mongoose');

let siteUserNonPiiSchema = mongoose.Schema({
    referencePiiId : {type: String, required: true },

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

    createdDate: { type: Date, default: new Date }
});

module.exports = mongoose.model('SiteUserNonPii', siteUserNonPiiSchema);