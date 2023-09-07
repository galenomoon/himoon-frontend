import { useEffect, useState } from "react";

//config
import api_client from "@/config/api_client";

//next
import { useRouter } from "next/router";

//components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NextHeader from "@/components/NextHeader";
import Breadcrump from "@/components/Breadcrump";

//interfaces
import { IProduct } from "@/interfaces/product";

export default function ProductPage() {
  const { query } = useRouter();
  const { product_slug } = query;
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, [product_slug]);

  async function getProduct() {
    if (!product_slug) return;

    return await api_client
      .get(`/products?slug=${product_slug}`)
      .then(({ data }) => setProduct(data))
      .catch(console.error);
  }

  return (
    <main className="flex min-h-screen flex-col text-typography-primary bg-background-primary items-center relative">
      <NextHeader
        title="Produtos | Hi, Moon Store 🌙💖"
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header />
      <section className="flex flex-col w-full h-screen max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        <Breadcrump />
        <div className="flex flex-col sm:flex-row gap-6 mt-8 rounded-xl bg-white h-[80vh]"></div>
      </section>
      <Footer />
    </main>
  );
}
