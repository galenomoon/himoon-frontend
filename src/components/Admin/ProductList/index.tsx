import React from 'react'

//interfaces
import { Product } from '@/interfaces/product'

//components
import EmptyState from '../EmptyState'
import ProductCard from '../ProductCard'

interface ProductListProps {
  products: Product[]
  isGrid: boolean
  openCreateModal: () => void
  openEditModal: (product: Product) => void,
  openDeleteAlert: (product: Product) => void
}

export default function ProductList({ products, isGrid, openEditModal, openDeleteAlert, openCreateModal }: ProductListProps) {
  return products?.length === 0 ?
    <div className='flex flex-col items-center justify-center h-[80%] w-full'>
      <EmptyState
        onClick={openCreateModal}
        buttonLabel="Criar novo produto"
        title="Nenhum produto encontrado"
        description="Tente novamente com outros termos de busca, ou tente em outra categoria"
      />
    </div>
    :
    <section className={`flex ${isGrid ? "flex-wrap" : "flex-col"} gap-4 p-4`}>
      {products?.map((product) =>
        <React.Fragment key={product.id}>
          <ProductCard product={product} openEditModal={openEditModal} openDeleteAlert={openDeleteAlert} isGrid={isGrid} />
        </React.Fragment>
      )}
    </section>
}
