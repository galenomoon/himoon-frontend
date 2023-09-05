import { useEffect, useState } from "react";

//config
import api_client from "@/config/api_client";

//components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import NextHeader from "@/components/NextHeader";
import Breadcrump from "@/components/Breadcrump";
import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";
import { HeaderSeparator } from "@/components/Separator";

//interfaces
import { IProduct } from "@/interfaces/product";
import { ICategory } from "@/interfaces/category";

//styles
import { Rows, SquaresFour } from "@phosphor-icons/react";

//hooks
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/router";

export default function ProductsPage() {
  const { query } = useRouter();
  const { category: categorySlug } = query;
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [productName, setProductName] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory>();
  const debouncedSearch = useDebounce(productName);

  useEffect(() => {
    getCategory();
    //eslint-disable-next-line
  }, [categorySlug]);

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, [debouncedSearch, category?.id]);

  async function getProducts() {
    const endpoint = category?.id
      ? `/products/category/${category?.id}?q=${productName || ""}`
      : `/products?q=${productName || ""}`;

    return await api_client
      .get(endpoint)
      .then(({ data }) => setProducts(data))
      .catch(console.error);
  }

  async function getCategory() {
    return await api_client
      .get(`/categories?slug=${categorySlug}`)
      .then(({ data }) => setCategory(data))
      .catch(console.error);
  }

  return (
    <main className="flex min-h-screen flex-col text-typography-primary bg-background-primary items-center sm:px-4 relative">
      <NextHeader
        title={`Produtos em ${category?.name || "Todas as Categorias"} | Hi, Moon Store 🌙💖`}
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header />
      <HeaderSeparator
        title="Todos os Produtos"
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <section className="flex md:px-52 gap-6 rounded-xl flex-col w-full h-full">
        <Breadcrump />
        <header className="flex w-full justify-between items-center">
          <p className="text-lg font-satoshi-medium">
            Resultados ({products.length})
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-lg">ORDENAR POR:</p>
            <select
              className={`bg-transparent outline-none text-black font-satoshi-light text-md w-[128px] px-2`}
            >
              <option value="name" selected>
                Nome
              </option>
              <option value="lowerPrice">Menor Preço</option>
              <option value="higherPrice">Maior Preço</option>
            </select>
          </div>
        </header>
        <section className="flex flex-col gap-6 min-h-screen">
          <header className="flex justify-between items-center gap-4">
            <Pagination />
            <SearchBar text={productName} setText={setProductName} />
            <div className="flex gap-2">
              <button
                onClick={() => setIsGrid(true)}
                className={`${
                  isGrid
                    ? "bg-typography-primary text-white border-typography"
                    : "bg-white hover:bg-gray-100"
                } border-2 duration-200 flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] rounded-lg font-satoshi-medium`}
              >
                <SquaresFour size={20} />
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`${
                  !isGrid
                    ? "bg-typography-primary text-white border-typography"
                    : "bg-white hover:bg-gray-100"
                } border-2 duration-200 flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] rounded-lg font-satoshi-medium`}
              >
                <Rows size={20} />
              </button>
            </div>
          </header>
          <ProductGrid products={products} />
        </section>
      </section>
      <Footer />
    </main>
  );
}
