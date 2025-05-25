'use client';

import { useState } from 'react';

export default function PhantomConnect() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window?.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect(); // Only connect on button click
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error('Connection failed!', err);
      }
    } else {
      alert('Phantom Wallet not found! Install it from https://phantom.app');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 absolute left-[74%] top-1/2 -translate-y-1/2 w-fit text-nowrap">
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform"
        id="connect-button"
      >
        {walletAddress ? 'Connected ✅' : 'Connect Phantom Wallet'}
      </button>
    </div>
  );
}
