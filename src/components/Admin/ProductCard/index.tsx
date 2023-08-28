import React from 'react'

//interfaces
import { Product } from '@/interfaces/product'

//styles
import { NotePencil, Trash } from '@phosphor-icons/react'

interface ProductCardProps {
  product: Product
  openEditModal: (product: Product) => void
  isGrid: boolean
}

export default function ProductCard({ product, openEditModal, isGrid }: ProductCardProps) {
  return (
    <div className={`flex relative gap-3 ${isGrid ? "flex-col sm:w-full md:w-[305px] h-[400px]" : "flex-row w-full h-fit"} p-4 rounded-2xl bg-gray-100`}>
      <section className={`absolute right-3 ${isGrid ? "bottom-3" : "top-3"} z-10 flex gap-2 items-center justify-center`}>
        <button onClick={() => openEditModal(product)} className='text-blue-800 bg-blue-400/20 border-2 border-blue-800/20 hover:opacity-60 duration-200 rounded-lg h-[32px] w-[32px] flex-shrink-0 flex items-center justify-center'>
          <NotePencil size={22} weight="fill" />
        </button>
        <button className='text-red-800 bg-red-400/20 border-2 border-red-800/20 hover:opacity-60 duration-200 rounded-lg h-[32px] w-[32px] flex-shrink-0 flex items-center justify-center'>
          <Trash size={22} weight="duotone" />
        </button>
      </section>
      {!product.images.length
        ? <div className={`${isGrid ? "w-full h-[220px]" : "w-[124px] h-[124px]"} flex-shrink-0 rounded-xl bg-gray-300 animate-pulse`} />
        : <img src={product.images[0]} alt={product.name} className={`${isGrid ? "w-full h-[220px]" : "w-[124px] h-[124px]"} flex-shrink-0 rounded-xl object-cover`} />
      }
      <footer className="flex flex-col w-full">
        <h1 className='font-semibold text-lg truncate'>
          {product.name}
        </h1>
        <span className="flex items-center gap-2 my-2">
          <p className="text-blue-800 rounded-full bg-blue-200 px-2 text-xs">
            unidade
          </p>
        </span>
        <p className="font-satoshi-regular opacity-60 text-sm line-clamp-2">
          {product.description.trim() || 'Sem descrição'}
        </p>
        <section className="flex items-center justify-between gap-6 mt-2">
          <h1 className="md:text-xl sm:text-3xl font-satoshi-black">
            R${(Number(product.price)).toFixed(2).replace('.', ',')}
          </h1>
        </section>
      </footer>
    </div>
  )
}