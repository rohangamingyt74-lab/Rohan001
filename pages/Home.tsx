import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Flame } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const Home = () => {
  const { games } = useStore();
  const trendingGames = games.filter(g => g.isTrending).slice(0, 3);
  const newReleases = games.filter(g => g.isNew).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/1080?random=10"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-400 font-bold tracking-widest mb-2">NEXT GEN GAMING</h2>
            <h1 className="text-5xl md:text-8xl font-black font-['Orbitron'] text-white drop-shadow-[0_0_20px_rgba(255,0,255,0.8)] mb-6">
              LEVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">UP</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Experience the future of entertainment. Immerse yourself in worlds beyond imagination.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.6)]"
            >
              BROWSE GAMES <ArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Slider (Simplified as grid) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Flame className="text-orange-500" />
          <h2 className="text-3xl font-bold font-['Orbitron'] text-white">TRENDING NOW</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingGames.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                <span className="text-cyan-400 text-sm font-bold">{game.genre}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                <div className="flex justify-between items-center">
                   <span className="text-pink-500 font-bold text-xl">${game.discountPrice || game.price}</span>
                   <Link to={`/product/${game.id}`} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm hover:bg-white/20">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-['Orbitron'] text-white mb-8">EXPLORE WORLDS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['RPG', 'ACTION', 'FPS', 'RACING'].map((cat) => (
                 <Link to={`/shop?category=${cat}`} key={cat} className="group p-8 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-500 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <h3 className="text-2xl font-bold text-gray-400 group-hover:text-white">{cat}</h3>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* Latest Releases */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Star className="text-yellow-400" />
          <h2 className="text-3xl font-bold font-['Orbitron'] text-white">LATEST DROPS</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((game, idx) => (
            <Link to={`/product/${game.id}`} key={game.id} className="block group">
              <div className="relative rounded-xl overflow-hidden mb-3 shadow-lg">
                <img src={game.image} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" />
                {game.discountPrice && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                )}
              </div>
              <h3 className="text-white font-bold truncate group-hover:text-cyan-400">{game.title}</h3>
              <p className="text-gray-400 text-sm">{game.platform}</p>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-pink-500 font-bold">${game.discountPrice || game.price}</span>
                 {game.discountPrice && <span className="text-gray-600 line-through text-sm">${game.price}</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
