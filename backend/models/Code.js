// models/Code.js
const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  fileName:{ type: String, required: true},
  date: { type: Date, default: Date.now },
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;
