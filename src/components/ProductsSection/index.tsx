import React from 'react'

//components
import ProductGrid from '../ProductGrid'

//mocks
import products from '../../mocks/products'

export default function ProductsSection() {
  return (
    <section className='flex flex-col max-w-[1300px] gap-12 items-center py-24 w-full h-fit min-h-screen'>
      <article className='flex flex-col items-center gap-2 justify-center w-fit'>
        <p className='font-satoshi-light text-5xl'>
          Nossos Produtos
        </p>
        <div className='h-[2px] w-[40%] bg-typography-primary/80' />
      </article>
      <ProductGrid products={products} />
    </section>
  )
}
