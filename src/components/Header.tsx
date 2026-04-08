import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, User, Bell, Crown, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Шинэ');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" class="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/30">
                U
              </div>
              <span className="text-2xl font-display font-black tracking-tighter hidden sm:block">
                UB<span className="text-brand-primary">LAB</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`nav-link ${activeCategory === cat ? 'nav-link-active' : ''}`}
              >
                {cat}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <div className={`relative flex-1 max-w-xs transition-all duration-300 ${isSearchVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none hidden md:block md:opacity-100 md:translate-x-0 md:pointer-events-auto'}`}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Мэдээ хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-primary/20 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>

            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
            >
              {isSearchVisible ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Mobile Category Scroll */}
        <div className="lg:hidden mt-4 overflow-x-auto no-scrollbar flex items-center gap-4 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <span className="text-xl font-display font-black">UBLAB</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-brand-primary">{cat}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary" />
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400 mt-4">
                  2026 оны шилдэг мэдээллийн сайт
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
