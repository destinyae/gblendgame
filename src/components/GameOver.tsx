import React, { useState } from 'react';
import { RefreshCw, Coins } from 'lucide-react';
import { ethers } from 'ethers';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    try {
      setIsMinting(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to mint NFTs!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      // Check if we're on the correct network
      if (network.chainId !== BigInt(20993)) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x51F1' }], // 20993 in hex
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x51F1',
                chainName: 'Fluent Chain',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://rpc.dev.gblend.xyz']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }

      const signer = await provider.getSigner();
      const amount = ethers.parseEther('0.001');

      // Send transaction
      const tx = await signer.sendTransaction({
        to: '0x0000000000000000000000000000000000000000', // Replace with actual NFT contract address
        value: amount,
        data: '0x', // Replace with actual mint function call
      });

      await tx.wait();
      alert('NFT minted successfully!');
    } catch (error: any) {
      console.error('Minting error:', error);
      alert(`Error minting NFT: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
      <h2 className="text-4xl font-bold text-white mb-2 text-center leading-relaxed">Game Over!</h2>
      <div className="text-5xl font-bold mb-6">
        <span className="text-blue-400">Final Score: </span>
        <span className="text-pink-500">{score}</span>
      </div>
      
      <div className="flex flex-col gap-4 w-full items-center">
        <button
          onClick={onRestart}
          className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <RefreshCw size={24} />
          <span>gBlend</span>
        </button>
        
        {score >= 60 && (
          <button
            onClick={handleMint}
            disabled={isMinting}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coins size={24} />
            <span>{isMinting ? 'Minting...' : 'Mint NFT'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GameOver;