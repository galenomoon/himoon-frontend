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
import { Minus, Plus, Star } from "@phosphor-icons/react";
import { FaWhatsapp } from "react-icons/fa";

//interfaces
import { IProduct } from "@/interfaces/product";

//assets
import imageNotFound from "@/assets/image-not-found.jpg";

export default function ProductPage() {
  const { query } = useRouter();
  const { product_slug, category_slug } = query;
  const [product, setProduct] = useState<IProduct>();
  const [quantity, setQuantity] = useState<number>(1);
  const [productsByCategory, setProductsByCategory] = useState<IProduct[]>();

  useEffect(() => {
    getProduct();
    getProductsByCategory();
    //eslint-disable-next-line
  }, [product_slug]);

  async function getProduct() {
    if (!product_slug) return;

    return await api_client
      .get(`/products/${product_slug}`)
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

  function openWhatsApp(product: IProduct) {
    const message = `Hi, Moon! Eu gostaria de ${quantity} unidade(s) do produto ${product.name}`;
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`;
    return window.open(link, "_blank");
  }

  return (
    <main className="flex min-h-screen flex-col text-typography-primary bg-background-primary items-center relative">
      <NextHeader
        title={`${product?.name} | Hi, Moon Store 🌙💖`}
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header />
      <section className="flex flex-col w-full pb-28 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Breadcrump />
        <div className="flex flex-col mt-8 rounded-xl bg-white text-typography-black h-fit shadow-lg">
          <section className="flex md:flex-row sm:flex-col">
            <figure className="flex flex-col flex-shrink-0 justify-center items-center gap-2 p-2 md:w-[400px]">
              <Image
                src={product?.images?.[0]?.url || imageNotFound}
                alt={product?.name || ""}
                width={400}
                height={400}
                objectFit="contain"
                className="rounded-lg flex-shrink-0"
              />
              <aside className="flex gap-2 justify-center overflow-scroll w-full">
                {product?.images?.map(({ url }, index) => (
                  <Image
                    key={index}
                    src={url || imageNotFound}
                    alt={product?.name || ""}
                    width={80}
                    height={80}
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
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-satoshi-regular text-typography-black/60">
                    Quantidade:
                  </span>{" "}
                  <Counter quantity={quantity} setQuantity={setQuantity} />
                </div>
                <button
                  onClick={() => openWhatsApp(product as IProduct)}
                  className="flex items-center flex-shrink-0 sm:text-xl md:text-base gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full md:w-80 sm:w-full px-6 py-3"
                >
                  <FaWhatsapp size={16} />
                  <p>Fazer pedido</p>
                </button>
              </section>
            </aside>
          </section>
        </div>
        {productsByCategory?.length && (
          <section className="bg-white rounded-2xl shadow-lg flex flex-col px-4 pb-3 pt-4 mt-8">
            <h2 className="text-2xl font-bold text-typography-black">
              Produtos relacionados
            </h2>
            <span className="bg-typography-black/5 w-full mb-2 my-4 h-[1.2px]" />
            <div className="flex sm:flex-col md:flex-row w-full md:overflow-x-auto max-w-screen-xl py-4 scrollbar-hide gap-6">
              {productsByCategory?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        )}
      </section>
      <Footer />
    </main>
  );
}

interface ICounter {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function Counter({ quantity, setQuantity }: ICounter) {
  return (
    <section className="flex gap-2 rounded-sm border border-typography-black/20 px-2">
      <button
        onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
        className="flex items-center justify-center px-1"
      >
        <Minus size={12} weight="bold" />
      </button>
      <input
        value={quantity}
        onChange={({ target }) =>
          setQuantity(/^[0-9]*$/g.test(target.value) ? Number(target.value) : 1)
        }
        className="font-satoshi-regular text-typography-black/60 w-16 py-1 border-x-[1px] border-x-typography-black/20 flex items-center text-center justify-center"
      />
      <button
        onClick={(e) => setQuantity(quantity + 1)}
        className="flex items-center justify-center px-1"
      >
        <Plus size={12} weight="bold" />
      </button>
    </section>
  );
}
