// Mock Data
const CATEGORIES = [
    'Шинэ',
    'Технологи',
    'Инноваци',
    'Хот төлөвлөлт',
    'Дижитал шилжилт',
    'Стартап',
    'Эдийн засаг',
    'Боловсрол',
    'Видео',
    'Шог'
];

const MOCK_ARTICLES = [
    {
        id: '1',
        title: 'Ublab: Улаанбаатар хотын дижитал ихэр төсөл эхэллээ',
        excerpt: 'Хотын дэд бүтэц, хөдөлгөөнийг бодит хугацаанд хянах "Digital Twin" технологийн туршилт амжилттай боллоо.',
        category: 'Хот төлөвлөлт',
        author: 'Ublab Team',
        imageUrl: 'https://picsum.photos/seed/digital-city/1200/800',
        views: 15600,
        tags: ['Smart City', 'Digital Twin', 'UB']
    },
    {
        id: '2',
        title: 'Монгол инженерүүдийн хөгжүүлсэн AI загвар дэлхийн топ 10-т багтав',
        excerpt: 'Байгалийн хэл боловсруулах чиглэлээр хийгдсэн шинэ судалгаа олон улсын хэмжээнд өндөр үнэлгээ авлаа.',
        category: 'Технологи',
        author: 'Г.Саран',
        imageUrl: 'https://picsum.photos/seed/ai-lab/1200/800',
        views: 12400,
        tags: ['AI', 'Innovation', 'Tech']
    },
    {
        id: '3',
        title: 'Дижитал шилжилт: Төрийн үйлчилгээ 100% цахим болох замд',
        excerpt: 'Блокчэйн технологид суурилсан төрийн үйлчилгээний шинэ платформ ирэх сараас ашиглалтад орно.',
        category: 'Дижитал шилжилт',
        author: 'Д.Тулга',
        imageUrl: 'https://picsum.photos/seed/blockchain/1200/800',
        views: 9800,
        tags: ['Blockchain', 'GovTech', 'UB']
    },
    {
        id: '4',
        title: 'Стартап: Монголын анхны "Unicorn" болох магадлалтай 5 компани',
        excerpt: 'Технологийн салбарт эрчтэй өсөж буй, гадаадын хөрөнгө оруулалт татсан шилдэг стартапуудын тойм.',
        category: 'Стартап',
        author: 'А.Бат',
        imageUrl: 'https://picsum.photos/seed/startup/1200/800',
        views: 18200,
        tags: ['Startup', 'Investment', 'Unicorn']
    },
    {
        id: '5',
        title: 'Инноваци: Сэргээгдэх эрчим хүчний шинэ шийдлүүд',
        excerpt: 'Нарны болон салхины эрчим хүчийг ахуйн хэрэглээнд үр ашигтай ашиглах технологийн зөвлөмжүүд.',
        category: 'Инноваци',
        author: 'Э.Золбоо',
        imageUrl: 'https://picsum.photos/seed/energy/1200/800',
        views: 7500,
        tags: ['GreenTech', 'Energy', 'Innovation']
    },
    {
        id: '6',
        title: 'Боловсрол: Ирээдүйн чадвар - Код бичих нь шинэ бичиг үсэг',
        excerpt: 'Ерөнхий боловсролын сургуулиудад мэдээллийн технологийн хичээлийг шинэчлэх шаардлага.',
        category: 'Боловсрол',
        author: 'М.Цэцэг',
        imageUrl: 'https://picsum.photos/seed/coding/1200/800',
        views: 11200,
        tags: ['EdTech', 'Coding', 'Future']
    }
];

// State
let currentSlide = 0;
let searchQuery = '';
let activeCategory = 'Бүгд';
const heroArticles = MOCK_ARTICLES.slice(0, 3);

// DOM Elements
const header = document.getElementById('main-header');
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileSideMenu = document.getElementById('mobile-side-menu');
const carouselTrack = document.getElementById('carousel-track');
const carouselIndicators = document.getElementById('carousel-indicators');
const newsGrid = document.getElementById('news-grid');
const trendingList = document.getElementById('trending-list');
const searchInput = document.getElementById('search-input');
const heroSection = document.getElementById('hero-carousel');

// Search Logic
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        if (searchQuery) {
            heroSection.style.display = 'none';
        } else {
            heroSection.style.display = 'block';
        }
        renderNews();
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('bg-white/90', 'backdrop-blur-lg', 'shadow-sm', 'py-2');
        header.classList.remove('py-4');
    } else {
        header.classList.remove('bg-white/90', 'backdrop-blur-lg', 'shadow-sm', 'py-2');
        header.classList.add('py-4');
    }
});

// Mobile Menu Logic
function toggleMobileMenu(show) {
    if (show) {
        mobileMenuOverlay.classList.remove('hidden');
        setTimeout(() => mobileMenuOverlay.classList.add('opacity-100'), 10);
        mobileSideMenu.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenuOverlay.classList.remove('opacity-100');
        mobileSideMenu.classList.add('-translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => mobileMenuOverlay.classList.add('hidden'), 300);
    }
}

mobileMenuTrigger.addEventListener('click', () => toggleMobileMenu(true));
mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));
mobileMenuOverlay.addEventListener('click', () => toggleMobileMenu(false));

// Carousel Logic
function renderCarousel() {
    carouselTrack.innerHTML = heroArticles.map((article, idx) => `
        <div class="absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}">
            <img src="${article.imageUrl}" class="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div class="container-custom">
                    <div class="max-w-3xl">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${article.category}</span>
                            <div class="flex items-center gap-2 text-white/70 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>2 цагийн өмнө</span>
                            </div>
                        </div>
                        <h2 class="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight">${article.title}</h2>
                        <p class="text-white/80 text-lg mb-8 line-clamp-2 hidden md:block max-w-2xl">${article.excerpt}</p>
                        <div class="flex items-center gap-6">
                            <button class="btn-primary flex items-center gap-2">
                                Дэлгэрэнгүй унших
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    carouselIndicators.innerHTML = heroArticles.map((_, idx) => `
        <button onclick="goToSlide(${idx})" class="h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-brand-primary' : 'w-2 bg-white/30'}"></button>
    `).join('');
}

window.goToSlide = (idx) => {
    currentSlide = idx;
    renderCarousel();
};

document.getElementById('next-slide').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % heroArticles.length;
    renderCarousel();
});

document.getElementById('prev-slide').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + heroArticles.length) % heroArticles.length;
    renderCarousel();
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % heroArticles.length;
    renderCarousel();
}, 6000);

// News Grid Logic
function renderNews() {
    let filtered = MOCK_ARTICLES;

    if (searchQuery) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchQuery) || 
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery)
        );
    }

    if (activeCategory !== 'Бүгд') {
        filtered = filtered.filter(article => article.category === activeCategory);
    }

    if (filtered.length === 0) {
        newsGrid.innerHTML = '<div class="col-span-full py-20 text-center text-gray-400">Илэрц олдсонгүй.</div>';
        return;
    }

    newsGrid.innerHTML = filtered.map(article => `
        <div class="flex flex-col group cursor-pointer">
            <div class="relative aspect-[16/10] overflow-hidden rounded-3xl mb-4">
                <img src="${article.imageUrl}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer">
                <div class="absolute top-4 left-4 flex gap-2">
                    <span class="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">${article.category}</span>
                </div>
            </div>
            <div class="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                <span>${article.author}</span>
                <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>2 цагийн өмнө</span>
            </div>
            <h3 class="text-xl font-bold leading-tight group-hover:text-brand-primary transition-colors mb-3 line-clamp-2">${article.title}</h3>
            <p class="text-gray-500 text-sm line-clamp-2 mb-4">${article.excerpt}</p>
            <div class="mt-auto flex items-center justify-between">
                <div class="flex items-center gap-4 text-gray-400 text-xs">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        <span>${article.views.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Category Tabs Logic
function setupCategoryTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;

    const tabs = ['Бүгд', ...CATEGORIES.slice(0, 5)];
    tabsContainer.innerHTML = tabs.map(cat => `
        <button onclick="setActiveCategory('${cat}')" class="text-sm font-bold uppercase tracking-widest relative py-2 whitespace-nowrap transition-colors ${cat === activeCategory ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'}">
            ${cat}
            ${cat === activeCategory ? '<span class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary"></span>' : ''}
        </button>
    `).join('');
}

window.setActiveCategory = (cat) => {
    activeCategory = cat;
    setupCategoryTabs();
    renderNews();
};

// Trending Logic
function renderTrending() {
    const trending = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
    trendingList.innerHTML = trending.map((article, idx) => `
        <div class="flex gap-4 group cursor-pointer py-3 border-b border-gray-100 last:border-0">
            <span class="text-2xl font-display font-black text-gray-100 group-hover:text-brand-primary/20 transition-colors">0${idx + 1}</span>
            <div class="flex flex-col">
                <span class="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1">${article.category}</span>
                <h4 class="text-sm font-bold leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">${article.title}</h4>
            </div>
        </div>
    `).join('');
}

// Initialize
renderCarousel();
setupCategoryTabs();
renderNews();
renderTrending();
