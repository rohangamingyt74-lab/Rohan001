import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "THE RISE OF NEURAL INTERFACE GAMING",
    excerpt: "Direct brain-computer interfaces are no longer fiction. We review the top 3 headsets for 2077.",
    author: "CyberJunkie",
    date: "OCT 12, 2077",
    category: "TECH",
    image: "https://picsum.photos/800/600?random=20"
  },
  {
    id: 2,
    title: "REVIEW: NEON CITY UPRISING",
    excerpt: "Is the hype real? We dive deep into the slums of Sector 4 to test the mechanics of this year's biggest RPG.",
    author: "Vanshika",
    date: "OCT 10, 2077",
    category: "REVIEW",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 3,
    title: "HIDDEN GEMS OF THE NETHER-WEB",
    excerpt: "Indie developers are pushing the boundaries of VR. Here are 5 games you missed.",
    author: "Glitch",
    date: "OCT 05, 2077",
    category: "INDIE",
    image: "https://picsum.photos/800/600?random=22"
  },
  {
    id: 4,
    title: "SPEED RUNNING: ZERO GRAVITY EDITION",
    excerpt: "The community has broken the sound barrier in Cyber Rally. Watch the record-breaking run.",
    author: "Turbo",
    date: "SEP 28, 2077",
    category: "ESPORTS",
    image: "https://picsum.photos/800/600?random=4"
  }
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-['Orbitron'] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        >
          NEON CHRONICLES
        </motion.h1>
        <p className="text-gray-400 text-xl font-['Rajdhani']">LATEST TRANSMISSIONS FROM THE GAMING GRID</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-cyan-400 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
                <Tag size={12} /> {post.category}
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1 text-pink-500"><User size={12} /> {post.author}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors font-['Orbitron'] leading-tight">
                {post.title}
              </h2>
              
              <p className="text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
              
              <button className="flex items-center gap-2 text-purple-400 font-bold group-hover:text-pink-500 transition-colors text-sm tracking-widest uppercase mt-4">
                Access Data <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-20 relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-50"></div>
        <div className="relative z-10 p-12 text-center space-y-6 bg-black/40 backdrop-blur-sm border border-white/10">
           <h3 className="text-3xl font-bold text-white font-['Orbitron']">STAY PLUGGED IN</h3>
           <p className="text-gray-300 max-w-lg mx-auto">Subscribe to our encrypted frequency to receive updates, loot drops, and exclusive cheat codes.</p>
           <div className="flex max-w-md mx-auto gap-2">
             <input type="email" placeholder="Enter secure email..." className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none" />
             <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg transition-colors">
               LINK
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;