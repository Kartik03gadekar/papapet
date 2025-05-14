'use client';
import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '4K UHD LED Smart TV with Chromecast Built-in',
      image: 'https://via.placeholder.com/80',
      price: 70,
      originalPrice: 99,
      quantity: 1,
      subtotal: 70,
    },
    {
      id: 2,
      name: 'Wired Over-Ear Gaming Headphones with USB',
      image: 'https://via.placeholder.com/80',
      price: 250,
      originalPrice: 250,
      quantity: 3,
      subtotal: 750,
    },
  ]);

  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity =
              type === 'increase' ? item.quantity + 1 : item.quantity - 1;

            // Ensure quantity doesn't go below 1
            if (newQuantity <= 0) {
              return null; // Will remove the item from the cart
            }

            return {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            };
          }
          return item;
        })
        .filter(Boolean) // Filter out null values (items to be removed)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = 24; // Example discount
  const shipping = 0; // Free shipping
  const tax = total * 0.1; // Example tax calculation (10%)

  const grandTotal = total - discount + tax + shipping;

  return (
    <div className="max-w-screen h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md rounded-xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Shopping Cart Table */}
        <div className="md:col-span-2 bg-white p-4 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shopping Cart</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2">Products</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-2 flex items-center gap-2 min-w-[200px]">
                      <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                        ✕
                      </button>
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                      <span className="line-clamp-2 text-sm">{item.name}</span>
                    </td>
                    <td className="p-2">
                      <span className="line-through text-gray-400 mr-1">${item.originalPrice}</span>
                      <span className="text-green-600 font-medium">${item.price}</span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center border rounded w-fit">
                        <button
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                          className="px-2"
                          disabled={item.quantity <= 1} // Prevent decreasing below 1
                        >
                          −
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 'increase')}
                          className="px-2"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 font-medium">Rs {item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 w-full sm:w-auto">
              ← Return to Shop
            </button>
            <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 w-full sm:w-auto">
              Update Cart
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white p-4 shadow-md rounded-xl space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="w-full border p-2 rounded text-sm mb-2"
            />
            <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              Apply Coupon
            </button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Cart Totals</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Sub-total</span>
                <span>Rs {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>Rs {discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Rs {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>Rs {grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
