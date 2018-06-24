let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);