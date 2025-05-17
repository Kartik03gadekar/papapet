'use client';

import { useEffect, useState } from 'react';

export default function PhantomConnect() {
  const [walletAddress, setWalletAddress] = useState(null);

  // Connect wallet
  const connectWallet = async () => {
    if (window?.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error('Connection failed!', err);
      }
    } else {
      alert('Phantom Wallet not found! Install it from https://phantom.app');
    }
  };

  // Auto-connect on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (window?.solana?.isPhantom) {
        try {
          const resp = await window.solana.connect({ onlyIfTrusted: true });
          if (resp.publicKey) {
            setWalletAddress(resp.publicKey.toString());
          }
        } catch (err) {
          console.log('Not trusted or user rejected auto-connect');
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 absolute left-[74%] top-1/2 -translate-y-1/2 w-fit text-nowrap">
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform"
        id="connect-button"
      >
        {walletAddress ? 'Connected ✅' : 'Connect Phantom Wallet'}
      </button>
      {/* {walletAddress && (
        <p id="wallet-address" className="text-sm text-gray-700">
          Connected: {walletAddress}
        </p>
      )} */}
    </div>
  );
}
