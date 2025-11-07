const Product = require('../models/Product');
const CartItem = require('../models/CartItem');
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

const getCart = async (req, res) => {
	const { cartId } = req.query;
	console.log('Received cartId:', cartId);

	if (!cartId) {
		return res
			.status(400)
			.json({ message: 'cartId query parameter is required' });
	}

	try {
		const items = await CartItem.find({ cart: cartId }).populate('product');
		// Calculate total price
		const total = items.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		);
		console.log('Cart items:', items);
		console.log('Total:', total);

		res.json({ items, total });
	} catch (err) {
		console.error('Error fetching cart:', err);
		res.status(500).json({ message: 'Failed to fetch cart' });
	}
};

const addToCart = async (req, res) => {
	const { cartId, items } = req.body; // items is array of { productId, qty }

	let cart;
	if (cartId) {
		cart = await Cart.findById(cartId);
		if (!cart) return res.status(404).json({ message: 'Cart not found' });
	} else {
		cart = new Cart();
		await cart.save();
	}

	const updatedItems = [];

	for (const { productId, qty } of items) {
		if (!productId || !qty || qty < 1) continue;

		const product = await Product.findById(productId);
		if (!product) continue;

		let cartItem = await CartItem.findOne({
			cart: cart._id,
			product: productId,
		});
		if (cartItem) {
			cartItem.quantity += qty;
		} else {
			cartItem = new CartItem({
				cart: cart._id,
				product: productId,
				quantity: qty,
			});
		}
		await cartItem.save();
		updatedItems.push(cartItem);
	}

	res.json({ cartId: cart._id, items: updatedItems });
};

const removeFromCart = async (req, res) => {
	try {
		const item = await CartItem.findByIdAndDelete(req.params.id);
		if (!item) return res.status(404).json({ message: 'Cart item not found' });
		res.json({ message: 'Item removed' });
	} catch (err) {
		console.error('Error removing item:', err);
		res.status(500).json({ message: 'Server error removing item' });
	}
};

module.exports = {
	getCart,
	addToCart,
	removeFromCart,
};
