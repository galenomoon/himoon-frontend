import React from 'react'

//components
import ProductGrid from '../ProductGrid'
import SectionTitle from '../SectionTitle'

//mocks
import products from '../../mocks/products'

export default function ProductsSection() {
  return (
    <section className='flex flex-col max-w-[1300px] gap-12 items-center py-24 w-full h-fit min-h-screen'>
      <SectionTitle>
        Produtos em destaque
      </SectionTitle>
      <ProductGrid products={products} />
    </section>
  )
}
