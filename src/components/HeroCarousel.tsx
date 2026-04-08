import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface HeroCarouselProps {
  articles: Article[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % articles.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);

  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-3xl bg-gray-900 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={articles[currentIndex].imageUrl}
            alt={articles[currentIndex].title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container-custom">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {articles[currentIndex].category}
                  </span>
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>2 цагийн өмнө</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight">
                  {articles[currentIndex].title}
                </h2>
                
                <p className="text-white/80 text-lg mb-8 line-clamp-2 hidden md:block max-w-2xl">
                  {articles[currentIndex].excerpt}
                </p>
                
                <div className="flex items-center gap-6">
                  <button className="btn-primary flex items-center gap-2">
                    Дэлгэрэнгүй унших
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{articles[currentIndex].views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-12 flex gap-2">
        {articles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === idx ? 'w-8 bg-brand-primary' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
