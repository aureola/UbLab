import { motion } from 'motion/react';
import { Eye, Clock, Share2, Bookmark, Crown } from 'lucide-react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  variant?: 'grid' | 'list' | 'compact';
  key?: string | number;
}

export default function NewsCard({ article, variant = 'grid' }: NewsCardProps) {
  if (variant === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex gap-4 group cursor-pointer"
      >
        <div className="relative w-32 h-24 sm:w-48 sm:h-32 flex-shrink-0 overflow-hidden rounded-2xl">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
            {article.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold leading-tight group-hover:text-brand-primary transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>1 цагийн өмнө</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="group cursor-pointer py-3 border-b border-gray-100 last:border-0">
        <div className="flex gap-2 mb-1">
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
            {article.category}
          </span>
        </div>
        <h4 className="text-sm font-bold leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
          {article.title}
        </h4>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-4">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-brand-primary shadow-sm">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-brand-primary shadow-sm">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">
        <span>{article.author}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>2 цагийн өмнө</span>
      </div>
      
      <h3 className="text-xl font-bold leading-tight group-hover:text-brand-primary transition-colors mb-3 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
        {article.excerpt}
      </p>
      
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{article.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
