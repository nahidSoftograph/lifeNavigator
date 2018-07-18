let mongoose = require('mongoose');

let siteUserNonPiiSchema = mongoose.Schema({
    referencePiiId : {type: String, required: true },

    instanceId: { type: String, required: false },
    instanceName: { type: String, required: false },

    accomplishmentOptions: [String],
    futureGoalOptions: [String],
    accomplishmentFullOptions: [],
    futureGoalFullOptions: [],

    heightFeet: { type: String, required: false },
    heightInch: { type: String, required: false },
    weight: { type: String, required: false },

    events: [],

    createdDate: { type: Date, default: new Date }
});

module.exports = mongoose.model('SiteUserNonPii', siteUserNonPiiSchema);