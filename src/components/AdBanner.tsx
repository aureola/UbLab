interface AdBannerProps {
  size?: 'leaderboard' | 'mobile' | 'inline';
  className?: string;
}

export default function AdBanner({ size = 'leaderboard', className = '' }: AdBannerProps) {
  const dimensions = {
    leaderboard: 'h-24 sm:h-32 w-full',
    mobile: 'h-24 w-full',
    inline: 'h-48 w-full'
  };

  return (
    <div className={`bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group ${dimensions[size]} ${className}`}>
      <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-200 rounded text-[8px] font-bold text-gray-500 uppercase tracking-widest z-10">
        AD
      </div>
      
      {/* Placeholder Content */}
      <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        <div className="h-2 w-32 bg-gray-200 rounded-full"></div>
      </div>
      
      {/* Mock Ad Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex w-16 h-16 bg-white/20 rounded-2xl items-center justify-center font-bold text-2xl">
            G
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-lg">ГОЛОМТ БАНК - ДИЖИТАЛ ЗЭЭЛ</h4>
            <p className="text-[10px] sm:text-xs text-white/80">Хамгийн бага хүүтэй, хамгийн хурдан шийдвэрлэлт</p>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors">
            Авах
          </button>
        </div>
      </div>
    </div>
  );
}
