const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const fetchFakeStoreProducts = async () => {
	try {
		const response = await axios.get('https://fakestoreapi.com/products');
		return response.data;
	} catch (error) {
		console.error('Error fetching Fake Store products:', error);
		return [];
	}
};

const syncProducts = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const fakeStoreProducts = await fetchFakeStoreProducts();

		for (const prod of fakeStoreProducts) {
			// Upsert product by external Fake Store product ID (stored in a new field)
			await Product.findOneAndUpdate(
				{ externalId: prod.id }, // Use external ID field to map products
				{
					externalId: prod.id,
					name: prod.title,
					price: prod.price,
					description: prod.description,
					category: prod.category,
					image: prod.image,
				},
				{ upsert: true, new: true }
			);
		}

		console.log(
			`Synced ${fakeStoreProducts.length} products from Fake Store API`
		);

		await mongoose.disconnect();
	} catch (err) {
		console.error('Error syncing products:', err);
	}
};

syncProducts();
