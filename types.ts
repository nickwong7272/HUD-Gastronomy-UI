
export type MenuCategory = 'MAIN' | 'DRINK' | 'SIDES' | 'SWEET' | 'SALAD' | 'MERCH';

export interface MenuItem {
  id: string;
  name: string;
  cuisine: string;
  price: string;
  description: string;
  rating: number;
  image: string;
  tags: string[];
  itemCategory: MenuCategory;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: string;
  menu: MenuItem[];
}
