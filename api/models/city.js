const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Москва',
  },
  cityId: {
    type: Number,
    require: true,
    // unique: true,
  },
});
module.exports = mongoose.model('city', citySchema);
