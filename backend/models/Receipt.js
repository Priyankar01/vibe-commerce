const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // snapshot of price at checkout
  }],
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Receipt = mongoose.model('Receipt', receiptSchema);
module.exports = Receipt;
