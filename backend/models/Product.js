const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  externalId: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  image: String,
});

module.exports = mongoose.model('Product', productSchema);
