import React, { useState, useEffect } from 'react';
import { useStore } from '../contexts/StoreContext';
import { Link, useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
  const { games } = useStore();
  const [filteredGames, setFilteredGames] = useState(games);
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [sortBy, setSortBy] = useState('popular');
  
  // Genres and Platforms extraction
  const genres = ['All', ...Array.from(new Set(games.map(g => g.genre)))];
  const platforms = ['All', ...Array.from(new Set(games.map(g => g.platform)))];

  useEffect(() => {
    let result = [...games];

    if (activeGenre !== 'All') {
      result = result.filter(g => g.genre === activeGenre);
    }
    if (activePlatform !== 'All') {
      result = result.filter(g => g.platform === activePlatform);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sortBy === 'price-desc') result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    if (sortBy === 'newest') result.sort((a, b) => b.releaseYear - a.releaseYear);
    // popularity mock logic
    if (sortBy === 'popular') result.sort((a, b) => b.rating - a.rating);

    setFilteredGames(result);
  }, [activeGenre, activePlatform, sortBy, games]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-['Orbitron'] font-bold text-white mb-2">GAME STORE</h1>
          <p className="text-gray-400">Found {filteredGames.length} titles</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
             <select 
               className="appearance-none bg-black border border-gray-700 text-white py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:border-cyan-500"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option value="popular">Popularity</option>
               <option value="newest">Newest</option>
               <option value="price-asc">Price: Low to High</option>
               <option value="price-desc">Price: High to Low</option>
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8 bg-black/40 p-6 rounded-xl border border-white/5 h-fit">
          <div>
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2"><Filter size={16}/> Genre</h3>
            <div className="space-y-2">
              {genres.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`block w-full text-left px-2 py-1 rounded transition-colors ${activeGenre === g ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2"><SlidersHorizontal size={16}/> Platform</h3>
            <div className="space-y-2">
              {platforms.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePlatform(p)}
                  className={`block w-full text-left px-2 py-1 rounded transition-colors ${activePlatform === p ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                  {game.platform}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold truncate pr-2">{game.title}</h3>
                  <span className="flex items-center text-yellow-500 text-xs gap-1">
                    <span className="font-bold">{game.rating}</span> ★
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{game.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Price</span>
                    <div className="flex gap-2 items-baseline">
                      <span className="text-lg font-bold text-cyan-400">${game.discountPrice || game.price}</span>
                      {game.discountPrice && <span className="text-xs text-gray-600 line-through">${game.price}</span>}
                    </div>
                  </div>
                  <Link 
                    to={`/product/${game.id}`}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredGames.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No games found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
