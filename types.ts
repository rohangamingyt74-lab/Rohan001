export interface Game {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  genre: string;
  platform: 'PC' | 'PS5' | 'Xbox' | 'Switch';
  rating: number;
  releaseYear: number;
  image: string;
  description: string;
  videoUrl?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface FilterState {
  genre: string | null;
  platform: string | null;
  priceRange: [number, number];
  rating: number | null;
  sort: 'price-asc' | 'price-desc' | 'popularity' | 'newest';
}
