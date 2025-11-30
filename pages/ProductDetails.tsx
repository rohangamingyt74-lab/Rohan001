import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { ShoppingCart, Heart, Share2, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { games, addToCart, addToWishlist, wishlist } = useStore();
  
  const game = games.find(g => g.id === id);
  const relatedGames = games.filter(g => g.genre === game?.genre && g.id !== game?.id).slice(0, 3);
  const inWishlist = wishlist.some(g => g.id === id);

  if (!game) return <div className="text-white text-center py-20">Game not found.</div>;

  return (
    <div className="pt-8 pb-16">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src={game.image} className="w-full h-full object-cover opacity-10 blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Media Section */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <img src={game.image} alt={game.title} className="w-full h-auto object-cover" />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
               {/* Mock screenshots */}
               {[1,2,3].map(i => (
                 <div key={i} className="rounded-lg overflow-hidden border border-white/10 opacity-70 hover:opacity-100 cursor-pointer">
                    <img src={`https://picsum.photos/400/300?random=${i+10}`} className="w-full h-24 object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="bg-cyan-900/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30">{game.platform}</span>
                <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">{game.genre}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold text-white mb-4">{game.title}</h1>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>Release: {game.releaseYear}</span>
                <span>•</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                    {game.rating} <StarIcon />
                </span>
                <span>•</span>
                <span>ID: #{game.id.padStart(4, '0')}</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <p className="text-gray-300 leading-relaxed mb-6">{game.description}</p>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                   <p className="text-gray-500 text-sm">Current Price</p>
                   <div className="flex items-baseline gap-3">
                     <span className="text-4xl font-bold text-pink-500">${game.discountPrice || game.price}</span>
                     {game.discountPrice && <span className="text-xl text-gray-500 line-through">${game.price}</span>}
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(game)}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} /> ADD TO CART
                </button>
                <button 
                  onClick={() => addToWishlist(game)}
                  className={`p-4 rounded-xl border border-white/20 transition-all ${inWishlist ? 'bg-pink-600 border-pink-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                >
                  <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* System Req Mock */}
            {game.platform === 'PC' && (
              <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                <h3 className="text-cyan-400 font-bold mb-4">SYSTEM REQUIREMENTS</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <span className="block text-gray-500">OS</span>
                    Windows 11 64-bit
                  </div>
                  <div>
                    <span className="block text-gray-500">Processor</span>
                    Intel Core i7 / AMD Ryzen 7
                  </div>
                  <div>
                    <span className="block text-gray-500">Memory</span>
                    16 GB RAM
                  </div>
                  <div>
                    <span className="block text-gray-500">Graphics</span>
                    NVIDIA RTX 3060 / AMD RX 6700
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Games */}
        <div className="mt-20">
            <h2 className="text-2xl font-['Orbitron'] text-white mb-6 border-l-4 border-purple-500 pl-4">SIMILAR PROTOCOLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGames.map(rg => (
                    <Link to={`/product/${rg.id}`} key={rg.id} className="block group">
                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
                            <img src={rg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <h4 className="text-white font-bold">{rg.title}</h4>
                        <span className="text-gray-500 text-sm">{rg.genre}</span>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
)

export default ProductDetails;
