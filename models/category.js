let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    instanceId: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    catId: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: false },
    options: []
});

module.exports = mongoose.model('Category', categorySchema);