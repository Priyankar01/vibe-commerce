'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Product {
	_id: string;
	name: string;
	price: number;
	image: string;
}

const ProductsList: React.FC = () => {
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);
	const [cartId, setCartId] = useState<string | null>(null);

	useEffect(() => {
		const storedCartId = localStorage.getItem('cartId');
		if (storedCartId) setCartId(storedCartId);

		axios
			.get('http://localhost:5000/api/products')
			.then((res) => setProducts(res.data))
			.catch(console.error);
	}, []);

	const addToCart = async (productId: string) => {
		try {
			const response = await axios.post('http://localhost:5000/api/cart', {
				cartId,
				items: [{ productId, qty: 1 }],
			});
			const newCartId = response.data.cartId;
			setCartId(newCartId);
			localStorage.setItem('cartId', newCartId);
			alert('Added to cart!');
		} catch (error) {
			console.error('Add to cart error', error);
		}
	};

	const goToCart = () => {
		if (cartId) {
			router.push(`/cart?cartId=${cartId}`);
		} else {
			alert('Cart is empty');
		}
	};

	return (
		<div className="p-4 bg-white text-gray-700">
			<div className="mx-3 flex justify-between items-center">
				<h2 className="text-2xl font-bold">Products</h2>
				<button
					className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer"
					onClick={goToCart}>
					Go to Cart
				</button>
			</div>

			<div className="flex flex-wrap">
				{products.map((p) => (
					<div
						key={p._id}
						className="border border-gray-300 p-4 m-3 w-52 rounded-md shadow-sm">
						<img
							src={p.image}
							alt={p.name}
							className="w-full h-40 object-contain mb-2"
						/>
						<h4 className="font-semibold overflow-hidden line-clamp-1 ">
							{p.name}
						</h4>
						<div className="flex justify-between items-center mt-2">
							<p className="text-indigo-600 font-bold">₹{p.price}</p>
							<button
								className="bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
								onClick={() => addToCart(p._id)}>
								Add to Cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductsList;
