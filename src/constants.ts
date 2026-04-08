import { Article, Category } from './types';

export const CATEGORIES: Category[] = [
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

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Ublab: Улаанбаатар хотын дижитал ихэр төсөл эхэллээ',
    excerpt: 'Хотын дэд бүтэц, хөдөлгөөнийг бодит хугацаанд хянах "Digital Twin" технологийн туршилт амжилттай боллоо.',
    content: '...',
    category: 'Хот төлөвлөлт',
    author: 'Ublab Team',
    publishedAt: '2026-04-07T10:00:00Z',
    imageUrl: 'https://picsum.photos/seed/digital-city/1200/800',
    views: 15600,
    tags: ['Smart City', 'Digital Twin', 'UB']
  },
  {
    id: '2',
    title: 'Монгол инженерүүдийн хөгжүүлсэн AI загвар дэлхийн топ 10-т багтав',
    excerpt: 'Байгалийн хэл боловсруулах чиглэлээр хийгдсэн шинэ судалгаа олон улсын хэмжээнд өндөр үнэлгээ авлаа.',
    content: '...',
    category: 'Технологи',
    author: 'Г.Саран',
    publishedAt: '2026-04-07T12:30:00Z',
    imageUrl: 'https://picsum.photos/seed/ai-lab/1200/800',
    views: 12400,
    tags: ['AI', 'Innovation', 'Tech']
  },
  {
    id: '3',
    title: 'Дижитал шилжилт: Төрийн үйлчилгээ 100% цахим болох замд',
    excerpt: 'Блокчэйн технологид суурилсан төрийн үйлчилгээний шинэ платформ ирэх сараас ашиглалтад орно.',
    content: '...',
    category: 'Дижитал шилжилт',
    author: 'Д.Тулга',
    publishedAt: '2026-04-06T15:00:00Z',
    imageUrl: 'https://picsum.photos/seed/blockchain/1200/800',
    views: 9800,
    tags: ['Blockchain', 'GovTech', 'UB']
  },
  {
    id: '4',
    title: 'Стартап: Монголын анхны "Unicorn" болох магадлалтай 5 компани',
    excerpt: 'Технологийн салбарт эрчтэй өсөж буй, гадаадын хөрөнгө оруулалт татсан шилдэг стартапуудын тойм.',
    content: '...',
    category: 'Стартап',
    author: 'А.Бат',
    publishedAt: '2026-04-07T08:00:00Z',
    imageUrl: 'https://picsum.photos/seed/startup/1200/800',
    views: 18200,
    tags: ['Startup', 'Investment', 'Unicorn']
  },
  {
    id: '5',
    title: 'Инноваци: Сэргээгдэх эрчим хүчний шинэ шийдлүүд',
    excerpt: 'Нарны болон салхины эрчим хүчийг ахуйн хэрэглээнд үр ашигтай ашиглах технологийн зөвлөмжүүд.',
    content: '...',
    category: 'Инноваци',
    author: 'Э.Золбоо',
    publishedAt: '2026-04-07T14:00:00Z',
    imageUrl: 'https://picsum.photos/seed/energy/1200/800',
    views: 7500,
    tags: ['GreenTech', 'Energy', 'Innovation']
  },
  {
    id: '6',
    title: 'Боловсрол: Ирээдүйн чадвар - Код бичих нь шинэ бичиг үсэг',
    excerpt: 'Ерөнхий боловсролын сургуулиудад мэдээллийн технологийн хичээлийг шинэчлэх шаардлага.',
    content: '...',
    category: 'Боловсрол',
    author: 'М.Цэцэг',
    publishedAt: '2026-04-07T09:00:00Z',
    imageUrl: 'https://picsum.photos/seed/coding/1200/800',
    views: 11200,
    tags: ['EdTech', 'Coding', 'Future']
  }
];
