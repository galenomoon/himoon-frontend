import React, { useEffect, useRef, useState } from "react";

//config
import api_client from "@/config/api_client";

//components
import ProductGrid from "../ProductGrid";
import SectionTitle from "../SectionTitle";

//next
import Link from "next/link";
import { useRouter } from "next/router";

//interfaces
import { IProductPaginated } from "@/interfaces/product";

//styles
import { Basket } from "@phosphor-icons/react";

export default function ProductsSection() {
  const { asPath } = useRouter();
  const currentSectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<IProductPaginated>({} as IProductPaginated);

  useEffect(() => {
    scrollToProductsSection(asPath);
  }, [asPath]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    return await api_client
      .get(`websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/products?quantity=9`)
      .then(({ data }) => setProducts(data))
      .catch(console.error);
  }

  function scrollToProductsSection(currentPath: string) {
    if (currentPath !== "/#produtos") return;
    return currentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      ref={currentSectionRef}
      className="flex flex-col max-w-[1300px] gap-12 items-center py-24 w-full h-fit min-h-screen"
    >
      <SectionTitle>Produtos em destaque</SectionTitle>
      <ProductGrid products={products.results} />
      <Link
        href="/produtos"
        className="flex gap-3 items-center text-center justify-center shadow-lg text-xl bg-typography-primary uppercase flex-shrink-0 my-4 md:w-fit md:px-12 sm:px-0 sm:w-[90%] self-center text-white font-bold py-4 px-6 rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out"
      >
        <Basket size={28} />
        <p>Ver todos os produtos</p>
      </Link>
    </section>
  );
}
