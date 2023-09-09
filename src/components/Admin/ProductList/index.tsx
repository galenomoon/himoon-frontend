import React from 'react'

//interfaces
import { IProduct } from '@/interfaces/product'

//components
import EmptyState from '../EmptyState'
import ProductCard from '../ProductCard'

//styles
import { Spinner } from '@phosphor-icons/react'

interface ProductListProps {
  products: IProduct[]
  isGrid: boolean
  isLoaded: boolean
  openCreateModal: () => void
  openEditModal: (product: IProduct) => void,
  openDeleteAlert: (product: IProduct) => void
}

export default function ProductList({ products, isGrid, isLoaded, openEditModal, openDeleteAlert, openCreateModal }: ProductListProps) {

  if (!isLoaded) return (
    <div className='flex flex-col items-center justify-center h-[80%] w-full'>
      <Spinner className='animate-spin' size={50} />
    </div>
  )

  if (products?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-[80%] w-full'>
        <EmptyState
          onClick={openCreateModal}
          buttonLabel="Criar novo produto"
          title="Nenhum produto encontrado"
          description="Tente novamente com outros termos de busca, ou tente em outra categoria"
        />
      </div>
    )
  }

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
