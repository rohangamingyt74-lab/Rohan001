import React from 'react';
import { useStore } from '../contexts/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-['Orbitron'] text-gray-600 mb-4">CART EMPTY</h2>
        <p className="text-gray-400 mb-8">System indicates zero items in storage.</p>
        <Link to="/shop" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
          INITIATE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-['Orbitron'] text-white mb-8 border-b border-gray-800 pb-4">SHOPPING CART</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-gray-900 rounded-xl p-4 flex gap-4 items-center border border-gray-800">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h3 className="text-white font-bold">{item.title}</h3>
                  <span className="text-pink-500 font-bold">${(item.discountPrice || item.price) * item.quantity}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{item.platform}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center bg-black rounded-lg border border-gray-700">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-gray-400 hover:text-white"><Minus size={16}/></button>
                    <span className="px-4 text-white font-mono">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-gray-400 hover:text-white"><Plus size={16}/></button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 sticky top-24">
            <h3 className="text-xl text-white font-bold mb-6">ORDER SUMMARY</h3>
            
            <div className="space-y-3 text-gray-400 text-sm mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (Estimated)</span>
                <span className="text-white">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-cyan-400">Digital Delivery (Free)</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-pink-500">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6">
               <div className="relative">
                  <Gift className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
                  <input type="text" placeholder="Promo Code / Gift Card" className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 mb-2" />
               </div>
               <button className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-700">Apply Code</button>
            </div>

            <Link to="/checkout" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all">
              CHECKOUT <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;