const Receipt = require('../models/Receipt');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

const checkout = async (req, res) => {
  const { cartId } = req.body;

  if (!cartId) {
    return res.status(400).json({ message: 'Cart ID is required' });
  }

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Get all items for this cart with populated product details
    const items = await CartItem.find({ cart: cart._id }).populate('product');

    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let total = 0;
    const receiptItems = items.map(item => {
      const quantity = item.quantity;
      const price = item.product.price;
      total += price * quantity;

      return {
        product: item.product._id,
        quantity,
        price,
      };
    });

    const receipt = new Receipt({
      items: receiptItems,
      total,
    });

    await receipt.save();

    await CartItem.deleteMany({ cart: cart._id });
    await Cart.findByIdAndDelete(cart._id);

    res.json({
      receiptId: receipt._id,
      total,
      timestamp: receipt.timestamp,
      items: receiptItems,
      message: 'Checkout successful',
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};

module.exports = {
  checkout,
};
