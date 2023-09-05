export interface IProduct {
  id?: number;
  name: string;
  price: number | string;
  description: string;
  categoryId?: number;
  images: string[];
}