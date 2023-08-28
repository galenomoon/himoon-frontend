import React from 'react'

//interfaces
import { Product } from '@/interfaces/product'

//components
import ProductCard from '../ProductCard'

interface ProductListProps {
  products: Product[]
  isGrid: boolean
  openEditModal: (product: Product) => void,
  openDeleteAlert: (product: Product) => void
}

export default function ProductList({ products, isGrid, openEditModal, openDeleteAlert }: ProductListProps) {
  return (
    <section className={`flex ${isGrid ? "flex-wrap" : "flex-col"} gap-4 p-4`}>
      {products?.map((product) =>
        <React.Fragment key={product.id}>
          <ProductCard product={product} openEditModal={openEditModal} openDeleteAlert={openDeleteAlert} isGrid={isGrid} />
        </React.Fragment>
      )}
    </section>
  )
}
