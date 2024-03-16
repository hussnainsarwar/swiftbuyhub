// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  engineCapacity: String,
  modelYear: String,
  Mileage: String,
  Company: String,
  Vaarient: String,
  EngineType: String,
  Transmission: String,
  BodyType: String,
  accident: Boolean,
  location: String,
  description: String,
  images: [String], // Array to store image paths

});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
