export interface Product {
  id?: number;
  name: string;
  price: number | string;
  description: string;
  category_id?: number;
  images: string[];
}