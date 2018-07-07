let mongoose = require('mongoose');

let siteUserSchema = mongoose.Schema({
    age: { type: String, required: true },
    gender: { type: String, required: true },
    zip: { type: String, required: true }
});

module.exports = mongoose.model('SiteUser', siteUserSchema);