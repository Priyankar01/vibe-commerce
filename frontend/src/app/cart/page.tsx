'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
	_id: string;
	name: string;
	price: number;
}

interface CartItem {
	_id: string;
	product: Product;
	quantity: number;
}

interface CartResponse {
	items: CartItem[];
	total: number;
}

const CartPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const queryCartId = searchParams.get('cartId') || null;
	const [cartId, setCartId] = useState<string | null>(null);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (queryCartId) {
			setCartId(queryCartId);
		} else {
			const storedId = localStorage.getItem('cartId');
			if (storedId) {
				setCartId(storedId);
				router.replace(`/cart?cartId=${storedId}`);
			} else {
				alert('No cart found. Please add products first.');
				router.push('/');
			}
		}
	}, [queryCartId, router]);

	useEffect(() => {
		if (!cartId) return;

		const fetchCart = async (id: string) => {
			setLoading(true);
			try {
				const res = await axios.get<CartResponse>(
					`http://localhost:5000/api/cart?cartId=${id}`
				);
				setCartItems(res.data.items);
				setTotal(res.data.total);
				localStorage.setItem('cartId', id);
			} catch (error) {
				console.error('Error fetching cart', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCart(cartId);
	}, [cartId]);

	const removeFromCart = async (itemId: string) => {
		try {
			await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
			if (cartId) {
				// Refresh cart
				const res = await axios.get<CartResponse>(
					`http://localhost:5000/api/cart?cartId=${cartId}`
				);
				setCartItems(res.data.items);
				setTotal(res.data.total);
			}
		} catch (error) {
			console.error('Error removing item', error);
		}
	};

	if (loading) {
		return (
			<div className="p-4 text-center">
				<p className="text-lg font-semibold">Loading cart...</p>
			</div>
		);
	}

	return (
		<div className="p-4 bg-white text-gray-700">
			<div className="px-3 flex justify-between items-center border-b">
				<h2 className="text-2xl font-bold">Cart</h2>
				<Link
					href="/"
					className="bg-indigo-600 text-white px-3 py-1 rounded mb-4 inline-block">
					Back to Products
				</Link>
			</div>

			{cartItems.length === 0 ? (
				<p className="text-gray-600 mx-3">Your cart is empty.</p>
			) : (
				<div className='mx-3'>
					<ul >
						{cartItems.map((item) => (
							<li
								key={item._id}
								className="flex justify-between items-center border-b py-2">
								<span>
									{item.product.name} - Qty: {item.quantity} - ₹
									{item.product.price * item.quantity}
								</span>
								<button
									className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
									onClick={() => removeFromCart(item._id)}>
									Remove
								</button>
							</li>
						))}
					</ul>
					<p className="font-semibold mt-4">Total: ₹{total}</p>
					<button
						className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
						onClick={() => router.push(`/checkout?cartId=${cartId}`)}>
						Proceed to Checkout
					</button>
				</div>
			)}
		</div>
	);
};

export default CartPage;
