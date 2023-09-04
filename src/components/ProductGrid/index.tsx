import React from 'react'
import { IProduct } from '@/interfaces/product'
import { ProductCard } from '../ProductCard'

interface ProductGridProps {
  products: IProduct[],
  className?: string
}

export default function ProductGrid({ products = [], className }: ProductGridProps) {
  return (
    <section className={`flex flex-wrap items-center w-full justify-center gap-6 ${className}`}>
      {products.map((product: IProduct, index) =>
        <React.Fragment key={index}>
          <ProductCard product={product} />
        </React.Fragment>
      )}
    </section>
  )
}