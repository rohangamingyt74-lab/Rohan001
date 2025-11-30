import React, { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartTotal, user } = useStore();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success

  if (step === 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h2 className="text-4xl font-['Orbitron'] text-white mb-4">TRANSACTION COMPLETE</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Thank you, {user?.name || 'Agent'}. Your digital keys have been transmitted to your encrypted email vault.
        </p>
        <Link to="/" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
          RETURN TO BASE
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-center mb-12">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-500'}`}>1</div>
        <div className="w-20 h-1 bg-gray-800 mx-2"><div className={`h-full bg-cyan-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-500'}`}>2</div>
        <div className="w-20 h-1 bg-gray-800 mx-2"><div className={`h-full bg-cyan-500 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-500'}`}>3</div>
      </div>

      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">BILLING DETAILS</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" defaultValue={user?.name.split(' ')[0]} />
              <input type="text" placeholder="Last Name" className="bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" defaultValue={user?.email} />
            <input type="text" placeholder="Address" className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" />
            
            <div className="flex justify-end pt-4">
              <button onClick={() => setStep(2)} className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-cyan-500">Next Step</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">PAYMENT METHOD</h2>
            
            <div className="grid gap-4">
              <div className="border border-cyan-500 bg-cyan-900/20 p-4 rounded-lg flex items-center gap-4 cursor-pointer">
                 <CreditCard className="text-cyan-400" />
                 <div>
                   <p className="text-white font-bold">Credit / Debit Card</p>
                   <p className="text-xs text-gray-400">Secure encrypted transaction</p>
                 </div>
              </div>
              <div className="border border-gray-700 bg-gray-800/50 p-4 rounded-lg flex items-center gap-4 cursor-pointer opacity-50">
                 <span className="font-mono text-gray-400">CRYPTO</span>
                 <div>
                   <p className="text-gray-300 font-bold">Bitcoin / ETH</p>
                   <p className="text-xs text-gray-500">Coming soon</p>
                 </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <input type="text" placeholder="Card Number" className="w-full bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="CVC" className="bg-black border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-800 mt-6">
               <div>
                 <span className="text-gray-400 text-sm">Total to pay:</span>
                 <p className="text-2xl font-bold text-pink-500">${(cartTotal * 1.08).toFixed(2)}</p>
               </div>
               <button onClick={() => setStep(3)} className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                 COMPLETE ORDER
               </button>
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white mt-2">Back to Details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
