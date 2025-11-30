import React from 'react';
import { useStore } from '../contexts/StoreContext';
import { User, Package, Heart, Settings, LayoutDashboard, Gift, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, wishlist, logout } = useStore();

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">Access Denied. Please identify yourself.</p>
        <Link to="/" className="text-cyan-400 underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white">
              {user.name[0]}
            </div>
            <h2 className="text-white font-bold">{user.name}</h2>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          
          <nav className="space-y-1">
             <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-cyan-400 rounded-lg font-medium"><User size={18}/> Overview</button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"><Package size={18}/> Orders</button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"><Heart size={18}/> Wishlist ({wishlist.length})</button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"><Settings size={18}/> Settings</button>
             {/* Admin Mock */}
             <button className="w-full flex items-center gap-3 px-4 py-3 text-pink-500 hover:bg-pink-500/10 rounded-lg transition-colors mt-8"><LayoutDashboard size={18}/> Admin Dashboard</button>
          </nav>

          <button onClick={logout} className="w-full mt-8 px-4 py-2 border border-red-900 text-red-500 rounded-lg hover:bg-red-900/20">
            Log Out
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
             <h2 className="text-2xl font-['Orbitron'] text-white mb-6">DASHBOARD</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-black p-4 rounded-lg border border-gray-800">
                 <p className="text-gray-500 text-sm">Total Spent</p>
                 <p className="text-2xl font-bold text-white">$1,204.55</p>
               </div>
               <div className="bg-black p-4 rounded-lg border border-gray-800">
                 <p className="text-gray-500 text-sm">Games Owned</p>
                 <p className="text-2xl font-bold text-white">42</p>
               </div>
               <div className="bg-black p-4 rounded-lg border border-gray-800">
                 <p className="text-gray-500 text-sm">Rank</p>
                 <p className="text-2xl font-bold text-yellow-500">Elite</p>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Gift className="text-pink-500" /> GIFT CARDS</h3>
               <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-lg mb-4 text-white">
                  <p className="text-xs opacity-80 mb-1">Current Balance</p>
                  <p className="text-3xl font-bold">$50.00</p>
               </div>
               <div className="flex gap-2">
                  <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className="flex-1 bg-black border border-gray-700 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-cyan-500" />
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Redeem</button>
               </div>
            </div>

             <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CreditCard className="text-cyan-400" /> PAYMENT</h3>
               <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-700 mb-2">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gray-700 rounded"></div>
                    <span className="text-gray-300 text-sm">•••• 4242</span>
                 </div>
                 <span className="text-xs text-green-500">Default</span>
               </div>
               <button className="text-cyan-400 text-sm hover:underline mt-2">+ Add New Method</button>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">WISHLIST</h2>
            {wishlist.length === 0 ? (
               <p className="text-gray-500">No items tracked.</p>
            ) : (
              <div className="space-y-4">
                {wishlist.map(game => (
                  <div key={game.id} className="flex gap-4 items-center bg-black/50 p-3 rounded-lg">
                    <img src={game.image} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h4 className="text-white font-bold">{game.title}</h4>
                      <p className="text-pink-500">${game.discountPrice || game.price}</p>
                    </div>
                    <Link to={`/product/${game.id}`} className="ml-auto text-sm text-cyan-400 hover:underline">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;