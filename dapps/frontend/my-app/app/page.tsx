'use client';

import { useState, useEffect } from 'react';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useReadContract,   // Tambahan
  useWriteContract   // Tambahan
} from 'wagmi';
import { injected } from 'wagmi/connectors';


// config
const CONTRACT_ADDRESS = '0x6987850a3653961e10842498b0b191020a1f3829'; 
const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: 'getValue',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  // --- READ & WRITE ---
  const [inputValue, setInputValue] = useState('');

  // Read
  const { data: value, isLoading: isReading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
  });

  // Write
  const { writeContract, isPending: isWriting } = useWriteContract();

  const handleSetValue = async () => {
    if (!inputValue) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'setValue',
      args: [BigInt(inputValue)],
    });
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold drop-shadow-md">🌸 Avalanche dApp</h1>
          <p className="text-pink-100 text-sm mt-2">Wallet Connection</p>
        </div>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isPending}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg transform hover:scale-105"
          >
            {isPending ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="space-y-4">

            {/* data wallet */}
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-pink-100">Status:</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">Connected ✅</span>
              </div>
              
              <div className="mb-2">
                 <span className="text-xs text-pink-200 block">Address:</span>
                 <span className="font-mono text-xs text-white bg-black/20 px-2 py-1 rounded block mt-1 break-all">
                    {address}
                 </span>
              </div>

              <div className="mb-2">
                 <span className="text-xs text-pink-200 block">Network:</span>
                 <span className="text-sm font-bold">Avalanche Fuji 🗻</span>
              </div>

              <div>
                 <span className="text-xs text-pink-200 block">Balance:</span>
                 <span className="text-sm font-bold">
                    {balance ? `${(Number(balance.value) / 10 ** balance.decimals).toFixed(6)} ${balance.symbol}` : 'Loading...'}
                 </span>
              </div>
            </div>

            {/* fitur baru */}
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 space-y-4">
                {/* read */}
                <div className="text-center border-b border-white/10 pb-4">
                    <p className="text-xs text-pink-200 mb-1">Stored Value:</p>
                    {isReading ? (
                        <p className="text-sm animate-pulse">Loading...</p>
                    ) : (
                        <h2 className="text-3xl font-bold text-yellow-300 drop-shadow-sm">
                            {value?.toString() || "0"}
                        </h2>
                    )}
                    <button onClick={() => refetch()} className="text-xs text-pink-300 underline mt-1 hover:text-white">
                        🔄 Refresh
                    </button>
                </div>

                {/* write */}
                <div>
                    <p className="text-xs text-pink-200 mb-2">Update Value:</p>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            placeholder="123..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-pink-400 transition text-sm"
                        />
                        <button 
                            onClick={handleSetValue}
                            disabled={isWriting}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg transition shadow-lg text-sm"
                        >
                            {isWriting ? '...' : 'Send 🚀'}
                        </button>
                    </div>
                </div>
            </div>

            {/* disconnect */}
            <button
              onClick={() => disconnect()}
              className="w-full bg-red-500/80 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-all text-sm"
            >
              Disconnect
            </button>
            
            <div className="border-t border-white/20 my-4"></div>

            {/* identitas */}
            <div className="text-center">
              <p className="text-xs text-pink-200 mb-1">Created by:</p>
              <p className="font-bold text-lg text-white drop-shadow-sm">Dwi Kurniasih</p>
              <p className="text-pink-100 text-sm">241011450655</p>
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}