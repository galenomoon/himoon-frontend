import { useEffect, useState } from "react";

//config
import api_client from "@/config/api_client";

//next
import { useRouter } from "next/router";

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
import { IProductPaginated } from "@/interfaces/product";

//hooks
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsPage() {
  const { query } = useRouter();
  const { category_slug: categorySlug } = query;
  const [productName, setProductName] = useState<string>("");
  const [products, setProducts] = useState<IProductPaginated>({} as IProductPaginated);
  const debouncedSearch = useDebounce(productName);

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, [debouncedSearch, categorySlug]);

  async function getProducts(page = 1) {
    const nameQuery = debouncedSearch ? `&q=${debouncedSearch}` : "";

    const endpoint = categorySlug
      ? `products/category/${categorySlug}?page=${page}${nameQuery}`
      : `products?page=${page}${nameQuery}`;

    return await api_client
      .get(`websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/` + endpoint)
      .then(({ data }) => setProducts(data))
      .catch(console.error);
  }

  return (
    <main className="flex min-h-screen flex-col text-typography-primary bg-background-primary items-center sm:px-4 relative">
      <NextHeader
        title={`Produtos | Hi, Moon Store 🌙💖`}
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header fixed />
      <HeaderSeparator
        title="Produtos"
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <section className="flex md:px-52 gap-6 rounded-xl flex-col w-full h-full pb-64">
        <Breadcrump />
        <header className="flex w-full justify-between items-center">
          <p className="text-lg font-satoshi-medium">
            Resultados ({products.totalItems})
          </p>
          <div className="flex sm:gap-0 md:gap-4 items-center">
            <p className="md:text-lg">ORDENAR POR:</p>
            <select className="bg-transparent outline-none text-black font-satoshi-light text-md md:w-[128px] px-2">
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
            <Pagination
              totalPages={products.totalPages}
              currentPage={products.currentPage}
              nextPage={getProducts}
              previousPage={getProducts}
            />
            <div className="sm:hidden md:flex gap-2 w-full">
              <SearchBar text={productName} setText={setProductName} />
            </div>
          </header>
          <div className="sm:block md:hidden gap-2 w-full">
            <SearchBar text={productName} setText={setProductName} />
          </div>
          <ProductGrid products={products.results} />
        </section>
      </section>
      <Footer />
    </main>
  );
}
