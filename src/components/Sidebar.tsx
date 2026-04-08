import { Mail, TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_ARTICLES } from '../constants';
import NewsCard from './NewsCard';

export default function Sidebar() {
  const trendingArticles = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-brand-secondary text-white p-8 rounded-3xl relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-primary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <Mail className="w-10 h-10 text-brand-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">Мэдээллээс хоцрохгүй байх</h3>
        <p className="text-white/60 text-sm mb-6">
          Өдөр тутмын хамгийн чухал мэдээллийг и-мэйлээрээ хүлээн аваарай.
        </p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="И-мэйл хаяг" 
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-colors"
          />
          <button className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-primary/90 transition-all">
            Бүртгүүлэх
          </button>
        </div>
      </div>

      {/* Trending News */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-brand-primary" />
          <h3 className="text-lg font-bold">Хамгийн их уншсан</h3>
        </div>
        <div className="space-y-2">
          {trendingArticles.map((article, idx) => (
            <div key={article.id} className="flex gap-4 group cursor-pointer py-3 border-b border-gray-100 last:border-0">
              <span className="text-2xl font-display font-black text-gray-100 group-hover:text-brand-primary/20 transition-colors">
                0{idx + 1}
              </span>
              <NewsCard article={article} variant="compact" />
            </div>
          ))}
        </div>
      </div>

      {/* Ad Placement */}
      <div className="bg-gray-100 aspect-[3/4] rounded-3xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Зар сурталчилгаа</span>
        <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-sm">
          300 x 400 AD
        </div>
        <button className="mt-6 text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline">
          Зар байршуулах <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
