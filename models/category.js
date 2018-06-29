let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryText: { type: String, required: true },
    isCategoryUnderAccomplishment: { type: Boolean, required: true },
    isCategoryUnderFutureGoals: { type: Boolean, required: true },
    parentSectionId: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('Category', categorySchema);