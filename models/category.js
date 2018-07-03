let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    catId: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Category', categorySchema);