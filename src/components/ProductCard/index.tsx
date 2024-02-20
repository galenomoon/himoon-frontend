import { useState } from "react"

//next
import Link from "next/link"
import Image from "next/image"

//interfaces
import { IProduct } from "@/interfaces/product"

//styles
import { FaWhatsapp } from "react-icons/fa"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

//assets
import productNotFound from "@/assets/image-not-found.jpg"

//utils
import { openWhatsApp } from "@/utils/openWhatsApp"

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <Link
      key={product.id}
      href={`/produtos/${product.category?.slug}/${product.slug}`}
      className="flex h-[420px] flex-shrink-0 flex-col gap-3 rounded-2xl bg-background-light p-3 shadow-md duration-200 hover:scale-[1.02] hover:shadow-lg sm:w-full md:w-[264px]"
    >
      <figure className="relative flex h-56 w-full flex-shrink-0 items-center justify-center rounded-xl">
        {product.images?.length > 1 && (
          <button
            onClick={(e) => {
              setCurrentImage(currentImage - 1)
              e.preventDefault()
            }}
            disabled={currentImage === 0}
            className="absolute left-2 z-[90] flex h-8 w-8 items-center justify-center self-center rounded-full bg-purple-400 bg-opacity-80 p-2 text-white duration-300 hover:bg-opacity-100 disabled:bg-gray-400"
          >
            <CaretLeft size={28} className="flex-shrink-0" />
          </button>
        )}
        <Image
          alt={product.name}
          width={264}
          height={264}
          className="h-56 w-full flex-shrink-0 rounded-xl object-cover"
          src={product.images?.[currentImage]?.url || productNotFound}
        />
        {product.images?.length > 1 && (
          <button
            onClick={(e) => {
              setCurrentImage(currentImage + 1)
              e.preventDefault()
            }}
            disabled={currentImage === product.images?.length - 1}
            className="absolute right-2 z-[90] flex h-8 w-8 items-center justify-center self-center rounded-full bg-purple-400 bg-opacity-80 p-2 text-white duration-300 hover:bg-opacity-100 disabled:bg-gray-400"
          >
            <CaretRight size={28} className="flex-shrink-0" />
          </button>
        )}
      </figure>
      <div className="flex h-full w-full flex-col items-start justify-between text-start">
        <article className="flex w-full flex-col">
          <h1
            title={product.name}
            className="font-satoshi-medium w-full truncate text-lg"
          >
            {product.name}
          </h1>
          <span className="flex items-center gap-2">
            <h1 className="font-satoshi-black whitespace-nowrap text-typography-black sm:text-3xl md:text-2xl">
              R$ {Number(product.price).toFixed(2).replace(".", ",")}
            </h1>
          </span>
          <p
            title={product.description}
            className="font-satoshi-regular line-clamp-2 text-sm opacity-80 "
          >
            {product.description}
          </p>
        </article>
        <button
          onClick={() => openWhatsApp(product)}
          className="font-satoshi-regular mt-4 flex w-full flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary px-6 py-2 text-white duration-200 hover:bg-opacity-90 sm:text-xl md:text-base"
        >
          <FaWhatsapp size={16} />
          <p>Fazer pedido</p>
        </button>
      </div>
    </Link>
  )
}
