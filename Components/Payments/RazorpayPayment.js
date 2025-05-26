// components/RazorpayPayment.js
import React from 'react';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorpayPayment = ({ amount, name, email, onSuccess }) => {
  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: 'rzp_test_q6BbMtempA0k7h', // Replace with your Razorpay Key
      amount: amount * 100, // Convert to paisa
      currency: 'INR',
      name: 'My Cozee',
      description: 'Proposal Payment',
      handler: function (response) {
        console.log('Payment Successful', response);
        alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        onSuccess(response); // Call the parent handler
      },
      prefill: {
        name: name || 'John Doe',
        email: email || 'johndoe@example.com',
        contact: '9876543210',
      },
      theme: {
        color: '#BC2C3D',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function (response) {
      console.error('Payment Failed', response.error);
      alert(`Payment failed.\n${response.error.description}`);
    });
  };

  return (
    <button
      onClick={displayRazorpay}
      className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200"
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayPayment;
