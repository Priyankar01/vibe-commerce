'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface ReceiptItem {
	product: string;
	quantity: number;
	price: number;
}

interface Receipt {
	receiptId: string;
	total: number;
	timestamp: string;
	items: ReceiptItem[];
	message?: string;
}

const CheckoutPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const cartId = searchParams.get('cartId');

	const [receipt, setReceipt] = useState<Receipt | null>(null);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!cartId) {
			alert('No cart to checkout. Redirecting to products.');
			router.push('/');
		}
	}, [cartId, router]);

	const handleCheckout = async () => {
		if (!cartId) return;
		setLoading(true);
		try {
			const response = await axios.post<Receipt>(
				'http://localhost:5000/api/checkout',
				{ cartId }
			);
			setReceipt(response.data);
			localStorage.removeItem('cartId');
		} catch (err) {
			setError('Checkout failed. Please try again.');
			console.error('Checkout error:', err);
		} finally {
			setLoading(false);
		}
	};

	if (!cartId) return null;

	if (loading) {
		return (
			<div className="p-4 text-center">
				<p className="text-lg font-semibold">Processing checkout...</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Checkout</h2>
			{!receipt ? (
				<>
					<p className="mb-4">Ready to place your order?</p>
					<button
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
						onClick={handleCheckout}>
						Confirm Checkout
					</button>
					<Link href={'/'} className=" mx-2">
						Cancel
					</Link>
					{error && <p className="text-red-600 mt-2">{error}</p>}
				</>
			) : (
				<div>
					<h3 className="text-xl font-semibold mb-2">Receipt</h3>
					<p>Order ID: {receipt.receiptId}</p>
					<p>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
					<p>Total: ₹{receipt.total}</p>
					<ul className="list-disc ml-6 mt-2">
						{receipt.items.map((item, index) => (
							<li key={index}>
								Product ID: {item.product} - Qty: {item.quantity} - Price: ₹
								{item.price}
							</li>
						))}
					</ul>
					<Link
						href="/"
						className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
						Back to Products
					</Link>
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;
