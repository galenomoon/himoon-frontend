import React, { useEffect, useRef } from 'react'

//components
import ProductGrid from '../ProductGrid'
import SectionTitle from '../SectionTitle'

//mocks
import products from '../../mocks/products'
import { useRouter } from 'next/router'

export default function ProductsSection() {
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    scrollToProductsSection(asPath)
  }, [asPath])

  function scrollToProductsSection(currentPath: string) {
    if (currentPath !== '/#produtos') return
    return currentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={currentSectionRef} className='flex flex-col max-w-[1300px] gap-12 items-center py-24 w-full h-fit min-h-screen'>
      <SectionTitle>
        Produtos em destaque
      </SectionTitle>
      <ProductGrid products={products} />
    </section>
  )
}
