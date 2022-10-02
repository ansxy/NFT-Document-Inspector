import React from "react";

export default function Button({ connectWallet, networkError, dismiss }) {
  return (
    <button
      onClick={connectWallet}
      className="bg-black text-white px-6 py-2 rounded-full"
    >
      Connect Wallet
    </button>
  );
}
