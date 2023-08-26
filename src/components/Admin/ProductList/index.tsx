import React from 'react'

//interfaces
import { Product } from '@/interfaces/product'

export default function ProductList({ products, isGrid }: { products: Product[], isGrid: boolean }) {
  return (
    <section className={`flex ${isGrid ? "flex-wrap" : "flex-col"} gap-4 p-4`}>
      {products?.map((product) => {

        // LIST VIEW
        if (!isGrid) return (
          <div key={product.id} className='flex gap-3 w-full md:w-full h-fit p-4 rounded-2xl bg-gray-100'>
            {!product.images.length ? <div className='w-[124px] h-[124px] flex-shrink-0 rounded-xl bg-gray-300 animate-pulse' /> :
              <img src={product.images[0]} alt={product.name} className='w-[124px] h-[124px] flex-shrink-0 rounded-xl object-cover' />
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
                  R${(product.price).toFixed(2).replace('.', ',')}
                </h1>
              </section>
            </footer>
          </div>
        )

        // GRID VIEW
        return (
          <div key={product.id} className='flex gap-3 flex-col sm:w-full md:w-[305px] h-[400px] p-4 rounded-2xl bg-gray-100'>
            {!product.images.length ? <div className='w-full h-[220px] rounded-xl bg-gray-300 animate-pulse' /> :
              <img src={product.images[0]} alt={product.name} className='w-full h-[220px] rounded-xl object-cover' />
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
                  R${(product.price).toFixed(2).replace('.', ',')}
                </h1>
              </section>
            </footer>
          </div>
        )
      })}
    </section>
  )
}
