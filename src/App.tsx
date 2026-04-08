import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Zap, Star, Video, Play, LayoutGrid } from 'lucide-react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import AdBanner from './components/AdBanner';
import { MOCK_ARTICLES, CATEGORIES } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('Бүгд');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let articles = MOCK_ARTICLES;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (activeTab !== 'Бүгд') {
      articles = articles.filter(article => article.category === activeTab);
    }

    return articles;
  }, [searchQuery, activeTab]);

  const techArticles = MOCK_ARTICLES.filter(a => a.category === 'Технологи');
  const startupArticles = MOCK_ARTICLES.filter(a => a.category === 'Стартап');
  const cityArticles = MOCK_ARTICLES.filter(a => a.category === 'Хот төлөвлөлт');

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="pt-24 pb-20">
        <div className="container-custom space-y-12">
          
          {/* Hero Section */}
          {!searchQuery && <HeroCarousel articles={MOCK_ARTICLES.slice(0, 3)} />}

          {/* Top Leaderboard Ad */}
          <AdBanner size="leaderboard" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content Area (70%) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Category Filter Tabs */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-8">
                  {['Бүгд', ...CATEGORIES.slice(0, 7)].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm font-bold uppercase tracking-widest transition-all relative py-2 whitespace-nowrap ${
                        activeTab === tab ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary" 
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-primary transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Бүгдийг харах</span>
                </button>
              </div>

              {/* Latest News Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-400">Илэрц олдсонгүй.</p>
                </div>
              )}

              {/* Load More Button */}
              {filteredArticles.length > 4 && (
                <div className="flex justify-center pt-8">
                  <button className="group flex items-center gap-3 bg-gray-100 hover:bg-brand-primary hover:text-white px-8 py-4 rounded-2xl font-bold transition-all">
                    <span>Илүү их мэдээ унших</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* Section: Technology */}
              {!searchQuery && techArticles.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-black flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-primary rounded-full"></span>
                      Технологи
                    </h2>
                    <button className="text-sm font-bold text-gray-400 hover:text-brand-primary flex items-center gap-1">
                      Бүгдийг харах <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {techArticles.map(article => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )}

              {/* Section: Video Hub */}
              <section className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary rounded-full blur-[120px] opacity-20"></div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-display font-black">Ublab Видео</h2>
                  </div>
                  <button className="text-sm font-bold text-white/60 hover:text-white transition-colors">Бүгдийг үзэх</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                        <img 
                          src={`https://picsum.photos/seed/video-${i}/600/400`} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {i === 1 ? 'Улаанбаатар хотын дижитал ихэр төсөл' : 
                         i === 2 ? 'AI технологийн шинэ эрин үе' : 
                         'Стартап экосистемийн ирээдүй'}
                      </h4>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: City Planning */}
              {!searchQuery && cityArticles.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-black flex items-center gap-3">
                      <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                      Хот төлөвлөлт
                    </h2>
                    <button className="text-sm font-bold text-gray-400 hover:text-brand-primary flex items-center gap-1">
                      Бүгдийг харах <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cityArticles.map(article => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Sidebar (30%) */}
            <div className="lg:col-span-4">
              <Sidebar />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <a href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  U
                </div>
                <span className="text-2xl font-display font-black tracking-tighter">
                  UB<span className="text-brand-primary">LAB</span>
                </span>
              </a>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ublab - Улаанбаатар хотын технологи, инноваци, хот төлөвлөлтийн нэгдсэн портал. Бид танд хамгийн сүүлийн үеийн, үнэн бодит мэдээллийг цаг алдалгүй хүргэж байна.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Ангилал</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {CATEGORIES.slice(0, 6).map(item => (
                  <li key={item}><a href="#" className="hover:text-brand-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Тусламж</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {['Бидний тухай', 'Холбоо барих', 'Зар сурталчилгаа', 'Нууцлалын бодлого', 'Үйлчилгээний нөхцөл'].map(item => (
                  <li key={item}><a href="#" className="hover:text-brand-primary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Холбоо барих</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо</li>
                <li>Утас: +976 7000 0000</li>
                <li>И-мэйл: info@ublab.mn</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              © 2026 Ublab. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            <div className="flex items-center gap-6">
              {['Facebook', 'Twitter', 'Instagram', 'Youtube'].map(social => (
                <a key={social} href="#" className="text-xs font-bold text-gray-400 hover:text-brand-primary transition-colors uppercase tracking-widest">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
