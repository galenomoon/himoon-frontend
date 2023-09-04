
//next
import Image from "next/image";

//interfaces
import { IProduct } from "@/interfaces/product";

//styles
import { FaWhatsapp } from "react-icons/fa";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  function whatsappLink() {
    const message = `Olá, gostaria de saber mais sobre o produto ${product.name}`;
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`;
    return link;
  }

  return (
    <button
      key={product.id}
      className="flex hover:shadow-lg shadow-md flex-shrink-0 hover:scale-[1.02] gap-3 duration-200 flex-col sm:w-full md:w-[264px] h-fit p-3 rounded-2xl bg-background-light"
    >
      {product.images.length > 1 ? (
        <Image
          alt={product.name}
          width={264}
          height={264}
          className="w-full h-56 rounded-xl object-cover"
          src={product.images[0]}
        />
      ) : (
        <div className="w-full h-56 rounded-xl bg-gradient-to-br to-white from-gray-100 animate-pulse flex items-center justify-center" />
      )}
      <footer className="flex items-start text-start flex-col w-full">
        <h1 className="font-satoshi-medium text-lg truncate w-full">
          {product.name}
        </h1>
        <span className="flex items-center gap-2">
          <h1 className="md:text-2xl sm:text-3xl font-satoshi-black text-typography-black whitespace-nowrap">
            R$ {Number(product.price).toFixed(2).replace(".", ",")}
          </h1>
        </span>
        <p className="font-satoshi-regular opacity-80 text-sm line-clamp-2 ">
          {product.description}
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-4 flex-shrink-0 sm:text-xl md:text-base gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full w-full px-6 py-2"
        >
          <FaWhatsapp size={16} />
          <p>Fazer pedido</p>
        </a>
      </footer>
    </button>
  );
}
