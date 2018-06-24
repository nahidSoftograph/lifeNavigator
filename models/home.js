let mongoose = require('mongoose');

let homeSchema = mongoose.Schema({
    instanceId: { type: String, requried: true },
    welComeText: { type: String, required: true },
    logoPath: { type: String, required: true },
    header: { type : String, required: true },
    info: { type: String, required: true },
    anchorText: { type: String, required: true },
    anchorLink: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true }
});

module.exports = mongoose.model('Home', homeSchema);