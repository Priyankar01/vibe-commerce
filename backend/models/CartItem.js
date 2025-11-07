// /models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
	cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
	quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('CartItem', cartItemSchema);
