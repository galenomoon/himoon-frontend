import { IProduct } from "@/interfaces/product"
import { FaWhatsapp } from "react-icons/fa"

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {

  function whatsappLink() {
    const message = `Olá, gostaria de saber mais sobre o produto ${product.name}`
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`
    return link
  }

  return (
    <button
      key={product.id}
      className='flex hover:shadow-md hover:scale-[1.02] gap-3 duration-200 flex-col sm:w-full md:w-[264px] h-fit p-4 rounded-2xl bg-background-light'
    >
      <img
        alt={product.name}
        className='w-full h-56 rounded-xl object-cover'
        src={product.images[0] || 'https://ae01.alicdn.com/kf/HTB1auYkbjLuK1Rjy0Fhq6xpdFXaS.jpg_640x640Q90.jpg_.webp'}
      />
      <footer className="flex items-start text-start flex-col w-full gap-1">
        <h1 className='font-satoshi-medium text-lg truncate w-full'>
          {product.name}
        </h1>
        <span className="flex items-center gap-2">
          <h1 className="md:text-2xl sm:text-3xl font-satoshi-bold text-[#19171A]/90 whitespace-nowrap">
            R$ {(Number(product.price)).toFixed(2).replace('.', ',')}
          </h1>
        </span>
        <p className="font-satoshi-regular opacity-80 text-sm line-clamp-2 ">
          {product.description}
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-4 flex-shrink-0 sm:text-xl md:text-base gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full w-full px-6 pt-1 pb-2"
        >
          <FaWhatsapp className="mt-1" size={16} />
          <p>
            ver mais
          </p>
        </a>
      </footer>
    </button>
  )
}