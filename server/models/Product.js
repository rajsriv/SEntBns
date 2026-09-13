const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'Buy Now',
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
