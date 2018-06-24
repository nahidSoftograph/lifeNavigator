let mongoose = require('mongoose');

let accomplishmentSchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    headerText: { type: String, required: true },
    subHeaderText: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true }
});

module.exports = mongoose.model('Accomplishment', accomplishmentSchema);