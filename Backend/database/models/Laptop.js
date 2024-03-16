// models/Laptop.js
const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  company: String,
  typeName: String,
  Ram: String,
  Weight: String,
  Touchscreen: String,
  Ips: String,
  ppi: String,
  Cpubrand: String,
  HDD: String,
  SSD: String,
  Gpubrand: String,
  os: String,
  description: String,
  location: String,
  images: [String], // Array to store image paths

});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
