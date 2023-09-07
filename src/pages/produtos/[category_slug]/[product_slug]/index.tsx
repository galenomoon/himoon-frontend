import { useEffect, useState } from "react";

//config
import api_client from "@/config/api_client";

//next
import Image from "next/image";
import { useRouter } from "next/router";

//components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NextHeader from "@/components/NextHeader";
import Breadcrump from "@/components/Breadcrump";
import { ProductCard } from "@/components/ProductCard";

//styles
import { Star } from "@phosphor-icons/react";
import { FaWhatsapp } from "react-icons/fa";

//interfaces
import { IProduct } from "@/interfaces/product";

//assets
import imageNotFound from "@/assets/image-not-found.jpg";

export default function ProductPage() {
  const { query } = useRouter();
  const { product_slug, category_slug } = query;
  const [product, setProduct] = useState<IProduct>();
  const [productsByCategory, setProductsByCategory] = useState<IProduct[]>();

  useEffect(() => {
    getProduct();
    getProductsByCategory();
    //eslint-disable-next-line
  }, [product_slug]);

  async function getProduct() {
    if (!product_slug) return;

    return await api_client
      .get(`/products?slug=${product_slug}`)
      .then(({ data }) => setProduct(data))
      .catch(console.error);
  }

  async function getProductsByCategory() {
    if (!product_slug) return;

    return await api_client
      .get(`/products/category/${category_slug}`)
      .then(({ data }) => setProductsByCategory(data))
      .catch(console.error);
  }

  return (
    <main className="flex min-h-screen flex-col text-typography-primary bg-background-primary items-center relative">
      <NextHeader
        title={`${product?.name} | Hi, Moon Store 🌙💖`}
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header />
      <section className="flex flex-col w-full pb-28 max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-8">
        <Breadcrump />
        <div className="flex flex-col mt-8 rounded-xl bg-white text-typography-black h-fit shadow-lg">
          <section className="flex">
            <figure className="flex flex-col flex-shrink-0 justify-center items-center gap-2 p-2 w-2/5">
              <Image
                src={imageNotFound}
                alt={product?.name || ""}
                width={500}
                height={500}
                objectFit="contain"
                className="rounded-lg flex-shrink-0"
              />
              <aside className="flex gap-2 overflow-scroll w-full">
                {Array.from({ length: 9 }).map((image, index) => (
                  <Image
                    key={index}
                    src={imageNotFound}
                    alt={product?.name || ""}
                    width={100}
                    height={100}
                    objectFit="contain"
                    className="rounded-lg flex-shrink-0 scrollbar-hide"
                  />
                ))}
              </aside>
            </figure>
            <aside className="flex flex-col gap-4 p-8">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{product?.name}</h1>
                <div className="flex gap-2">
                  <section className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        size={18}
                        weight="fill"
                        key={index}
                        color="#FBBF24"
                      />
                    ))}
                  </section>
                  <p className="font-satoshi-regular text-typography-black/40">
                    (0 avaliações)
                  </p>
                </div>
                <p className="text-2xl font-satoshi-black text-typography-primary">
                  R$ {Number(product?.price)?.toFixed(2)}
                </p>
                <article className="flex pt-2 pb-8 border-y-[1px] max-h-[100px]">
                  <p className="font-satoshi-regular text-typography-black/60">
                    {product?.description}
                  </p>
                </article>
              </div>
              <button className="flex items-center flex-shrink-0 sm:text-xl md:text-base gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full w-80 px-6 py-3">
                <FaWhatsapp size={16} />
                <p>Fazer pedido</p>
              </button>
            </aside>
          </section>
        </div>
        <section className="bg-white rounded-2xl shadow-lg flex flex-col px-4 pb-3 pt-4 mt-8">
          <h2 className="text-2xl font-bold text-typography-black">
            Produtos relacionados
          </h2>
          <span className="bg-typography-black/5 w-full mb-2 my-4 h-[1.2px]" />
          <div className="flex w-full overflow-x-auto max-w-screen-xl py-4 scrollbar-hide gap-6">
            {productsByCategory?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
