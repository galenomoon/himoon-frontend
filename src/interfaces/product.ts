import { ICategory } from "./category";

export interface IProduct {
  id?: number;
  name: string;
  price: number | string;
  slug?: string;
  description: string;
  categoryId?: number;
  category?: ICategory;
  images: string[];
}

export interface IProductPaginated {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  results: IProduct[];
}