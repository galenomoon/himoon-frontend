import React from 'react'
import { IProduct } from '@/interfaces/product'
import { ProductCard } from '../ProductCard'

interface ProductGridProps {
  products: IProduct[]
}

export default function ProductGrid(products_props: ProductGridProps) {
  return (
    <section className='flex flex-wrap items-center w-full justify-center gap-6'>
      {products_props.products.map((product: IProduct, index) =>
        <React.Fragment key={index}>
          <ProductCard product={product} />
        </React.Fragment>
      )}
    </section>
  )
}