import React from 'react'
import { Product } from '@/interfaces/product'
import { ProductCard } from '../ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid(products_props: ProductGridProps) {
  return (
    <section className='flex flex-wrap items-center w-full justify-center gap-6 py-12'>
      {products_props.products.map((product: Product, index) =>
        <React.Fragment key={index}>
          <ProductCard product={product} />
        </React.Fragment>
      )}
    </section>
  )
}