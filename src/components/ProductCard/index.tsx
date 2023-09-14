import { useState } from "react";

//next
import Link from "next/link";
import Image from "next/image";

//interfaces
import { IProduct } from "@/interfaces/product";

//styles
import { FaWhatsapp } from "react-icons/fa";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

//assets
import productNotFound from "@/assets/image-not-found.jpg";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  function openWhatsApp() {
    const message = `Olá, gostaria de saber mais sobre o produto ${product.name}`;
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`;
    return window.open(link, "_blank");
  }

  return (
    <Link
      key={product.id}
      href={`/produtos/${product.category?.slug}/${product.slug}`}
      className="flex hover:shadow-lg shadow-md flex-shrink-0 hover:scale-[1.02] gap-3 duration-200 flex-col sm:w-full md:w-[264px] h-[420px] p-3 rounded-2xl bg-background-light"
    >
      <figure className="flex items-center justify-center w-full flex-shrink-0 h-56 rounded-xl relative">
        {product.images?.length > 1 && (
          <button
            onClick={(e) => {
              setCurrentImage(currentImage - 1);
              e.preventDefault();
            }}
            disabled={currentImage === 0}
            className="absolute disabled:bg-gray-400 self-center left-2 text-white h-8 w-8 flex items-center justify-center bg-purple-400 bg-opacity-80 duration-300 hover:bg-opacity-100 rounded-full p-2 z-[90]"
          >
            <CaretLeft size={28} className="flex-shrink-0" />
          </button>
        )}
        <Image
          alt={product.name}
          width={264}
          height={264}
          className="w-full h-56 rounded-xl object-cover flex-shrink-0"
          src={product.images?.[currentImage]?.url || productNotFound}
        />
        {product.images?.length > 1 && (
          <button
            onClick={(e) => {
              setCurrentImage(currentImage + 1);
              e.preventDefault();
            }}
            disabled={currentImage === product.images?.length - 1}
            className="absolute disabled:bg-gray-400 self-center right-2 text-white h-8 w-8 flex items-center justify-center bg-purple-400 bg-opacity-80 duration-300 hover:bg-opacity-100 rounded-full p-2 z-[90]"
          >
            <CaretRight size={28} className="flex-shrink-0" />
          </button>
        )}
      </figure>
      <div className="flex items-start text-start justify-between h-full flex-col w-full">
        <article className="flex flex-col w-full">
          <h1
            title={product.name}
            className="font-satoshi-medium text-lg truncate w-full"
          >
            {product.name}
          </h1>
          <span className="flex items-center gap-2">
            <h1 className="md:text-2xl sm:text-3xl font-satoshi-black text-typography-black whitespace-nowrap">
              R$ {Number(product.price).toFixed(2).replace(".", ",")}
            </h1>
          </span>
          <p
            title={product.description}
            className="font-satoshi-regular opacity-80 text-sm line-clamp-2 "
          >
            {product.description}
          </p>
        </article>
        <button
          onClick={openWhatsApp}
          className="flex items-center mt-4 flex-shrink-0 sm:text-xl md:text-base gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full w-full px-6 py-2"
        >
          <FaWhatsapp size={16} />
          <p>Fazer pedido</p>
        </button>
      </div>
    </Link>
  );
}
