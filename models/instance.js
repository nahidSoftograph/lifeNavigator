let mongoose = require('mongoose');

let instanceSchema = mongoose.Schema({
    instanceName: { type: String, required: true, unique: true },
    companyName: { type: String, required: true, unique: true },
    instanceLink: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model('Instance', instanceSchema);