const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		console.error('Error fetching products:', err);
		res.status(500).json({ message: 'Server error fetching products' });
	}
};
