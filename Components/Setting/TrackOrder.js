import React from 'react';

const TrackOrder = ({user}) => {
  console.log(user);
  const order = {

    id: '96459761',
    productCount: 4,
    orderDate: '17 Jan, 2021 at 7:32 PM',
    totalAmount: 1199,
    expectedArrival: '23 Jan, 2021',
    steps: ['Order Placed', 'Packaging', 'On The Road', 'Delivered'],
    currentStepIndex: 1,
    activity: [
      { type: 'success', message: 'Your order has been delivered. Thank you for shopping at Cicool' },
      { type: 'info', message: 'Our delivery man (Robin Wills) has picked up your order for delivery.' },
      { type: 'info', message: 'Your order has reached at last mile hub.' },
      { type: 'info', message: 'Your order is on the way to last mile hub.' },
      { type: 'info', message: 'Your order is successfully verified.' },
      { type: 'info', message: 'Your order has been confirmed.' },
    ],
    products: [
      {
        name: 'Google Pixel 5',
        description: 'Unlocked Smartphone w/ Advanced Pixel Camera',
        price: 899,
        quantity: 1,
      },
      {
        name: 'Crystal Clear Case',
        description: 'Tech21 Evo Clear for Google Pixel 6 Pro',
        price: 39,
        quantity: 1,
      },
    ],
    billingAddress: {
      name: 'Kevin Gilbert',
      address: 'East Transit Bazaar, Ward No. 04, Road No. 13, Tinsukia, Assam',
      email: 'kev.gilbert@gmail.com',
    },
    shippingAddress: {
      name: 'Kevin Gilbert',
      address: 'East Transit Bazaar, Ward No. 04, Road No. 13, Tinsukia, Assam',
      email: 'kev.gilbert@gmail.com',
    },
    notes: 'Handle with care. Avoid magnetic fields.',
  };

  const {
    id,
    productCount,
    orderDate,
    totalAmount,
    expectedArrival,
    steps,
    currentStepIndex,
    activity,
    products,
    billingAddress,
    shippingAddress,
    notes,
  } = order;

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md rounded-xl">
      {/* Order Summary */}
      <div className="border-b pb-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h2 className="text-lg font-semibold">#{id}</h2>
            <p className="text-sm text-gray-500">
              {productCount} Products • Order Placed on {orderDate}
            </p>
          </div>
          <div className="text-xl font-bold text-blue-600 sm:text-right">${totalAmount}</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Order expected arrival <span className="text-black font-medium">{expectedArrival}</span>
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between text-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 min-w-[80px]">
            <div
              className={`rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center ${
                index <= currentStepIndex
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`text-xs ${
                index <= currentStepIndex
                  ? 'text-black font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Order Activity */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Activity</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {activity.map((item, i) => (
            <li key={i}>
              <span className={`font-medium ${
                item.type === 'success' ? 'text-green-600' : 'text-blue-500'
              }`}>✓</span> {item.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Product ({products.length})
        </h3>
        <div className="space-y-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">{product.description}</p>
              </div>
              <div className="text-right text-sm">
                <p>${product.price}</p>
                <p className="text-xs text-gray-500">x{product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="border rounded-md p-4">
          <h4 className="font-semibold text-gray-800 mb-1">Billing Address</h4>
          <p>{user?.name}<br />{user?.address}</p>
          <p className="mt-1 text-xs">Email: {user?.email}</p>
        </div>
        <div className="border rounded-md p-4">
          <h4 className="font-semibold text-gray-800 mb-1">Shipping Address</h4>
          <p>{user?.name}<br />{user?.address}</p>
          <p className="mt-1 text-xs">Email: {user?.email}</p>
        </div>
        <div className="border rounded-md p-4">
          <h4 className="font-semibold text-gray-800 mb-1">Order Notes</h4>
          <p className="text-xs">{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
