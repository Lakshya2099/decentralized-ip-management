const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  ipHash: String,
  owner: String,
  timestamp: Date,
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

module.exports = Certificate;
