import { ICategory } from "./category";

export interface IProduct {
  id?: number;
  name: string;
  price: number | string;
  slug?: string;
  description: string;
  categoryId?: number;
  category?: ICategory;
  images: IImage[];
}

export interface IProductPaginated {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  results: IProduct[];
}

export interface IImage {
  id?: number;
  url: string;
  productId?: number;
  product?: IProduct;
}