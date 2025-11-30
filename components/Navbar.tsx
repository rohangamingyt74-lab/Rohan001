import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartTotal, cart, user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/shop' },
    { name: 'Blog', path: '/blog' }, // Placeholder
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-3xl font-['Orbitron'] font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
              ROHAN
            </h1>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                      : 'text-gray-300 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-48 pl-4 p-2 transition-all group-hover:w-64"
               />
               <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <Link to="/profile" className="text-gray-300 hover:text-cyan-400 transition-colors">
               <div className="flex items-center gap-2">
                 <User className="h-6 w-6" />
                 {user && <span className="text-xs text-cyan-500 font-mono">detected</span>}
               </div>
            </Link>

            <Link to="/cart" className="relative text-gray-300 hover:text-pink-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_5px_#db2777]">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-purple-500/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/cart" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-pink-400 block px-3 py-2 rounded-md text-base font-medium">
                Cart ({cart.length})
              </Link>
               <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-pink-400 block px-3 py-2 rounded-md text-base font-medium">
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
