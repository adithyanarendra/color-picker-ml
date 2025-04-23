const mongoose = require('mongoose');

const ColorPreferenceSchema = new mongoose.Schema({
    hex: { type: String, required: true },
    action: { type: String, enum: ['like', 'meh', 'dislike'], required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ColorPreference', ColorPreferenceSchema);
