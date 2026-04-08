export type Category = 
  | 'Шинэ' 
  | 'Технологи' 
  | 'Инноваци' 
  | 'Хот төлөвлөлт' 
  | 'Дижитал шилжилт' 
  | 'Стартап' 
  | 'Эдийн засаг' 
  | 'Боловсрол' 
  | 'Видео' 
  | 'Шог' 
  | 'Спорт'
  | 'Бүгд';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishedAt: string;
  imageUrl: string;
  views: number;
  isPremium?: boolean;
  tags: string[];
}

export interface AdPlacement {
  id: string;
  type: 'banner' | 'sidebar' | 'native';
  imageUrl: string;
  link: string;
  provider: string;
}
