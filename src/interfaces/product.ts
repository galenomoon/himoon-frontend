import { ICategory } from "./category";

export interface IProduct {
  id?: number;
  name: string;
  price: number | string;
  description: string;
  categoryId?: number;
  category?: ICategory;
  images: string[];
}