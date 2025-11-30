import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import WelcomeOverlay from './components/WelcomeOverlay';
import ChatBot from './components/ChatBot';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-pink-500 selection:text-white">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <Navbar />
      <main className="pt-20 relative z-10">
        {children}
      </main>
      
      <footer className="relative z-10 border-t border-gray-800 bg-black mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-['Orbitron'] font-bold text-white mb-4">ROHAN</h2>
          <p className="text-gray-500 text-sm mb-8">
            © 2077 ROHAN GAMING CORP. ALL RIGHTS RESERVED. <br/>
            SYSTEM SECURE. CONNECTION ENCRYPTED.
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-cyan-400">Terms</a>
            <a href="#" className="hover:text-cyan-400">Privacy</a>
            <a href="#" className="hover:text-cyan-400">Support</a>
          </div>
        </div>
      </footer>
      
      <ChatBot />
    </div>
  );
};

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <StoreProvider>
      {showWelcome && <WelcomeOverlay onComplete={() => setShowWelcome(false)} />}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;