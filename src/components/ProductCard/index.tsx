import { IProduct } from "@/interfaces/product"
import { FaWhatsapp } from "react-icons/fa"

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {

  function whatsappLink() {
    const message = `Olá, gostaria de saber mais sobre o produto ${product.name}`
    const link =  `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`
    return link
  }

  return (
    <div key={product.id} className='flex gap-3 duration-200 flex-col sm:w-full md:w-[305px] h-fit p-4 rounded-2xl bg-background-light'>
      <img src={product.images[0] || 'https://ae01.alicdn.com/kf/HTB1auYkbjLuK1Rjy0Fhq6xpdFXaS.jpg_640x640Q90.jpg_.webp'} alt={product.name} className='w-full h-72 rounded-xl object-cover' />
      <footer className="flex flex-col w-full">
        <h1 className='font-semibold text-xl truncate'>
          {product.name}
        </h1>
        <span className="flex items-center gap-2 my-2">
          <p className="text-[#827c30] rounded-full bg-background-primary px-2 text-sm">
            unidade
          </p>
        </span>
        <p className="font-satoshi-regular text-sm line-clamp-2">
          {product.description}
        </p>
        <section className="flex items-center justify-between gap-6 mt-5">
          <h1 className="md:text-2xl sm:text-3xl font-satoshi-black">
            R${(Number(product.price)).toFixed(2).replace('.', ',')}
          </h1>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center sm:text-xl md:text-[18px] gap-2 justify-center bg-typography-primary hover:bg-opacity-90 duration-200 text-white font-satoshi-regular whitespace-nowrap rounded-full w-[320px] py-2"
          >
            <FaWhatsapp className="inline-block" />
            <p>
              ver mais
            </p>
          </a>
        </section>
      </footer>
    </div>
  )
}