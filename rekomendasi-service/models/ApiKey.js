const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  apiKey: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);
