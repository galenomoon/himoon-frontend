import React, { useEffect, useState } from 'react'

//interfaces
import { Product } from '@/interfaces/product'
import { Category } from '@/interfaces/category'

//config
import api_client from '@/config/api_client'

//components
import Modal from '../Modal'
import Alert from '../Alert'
import ProductList from '../ProductList'
import ProductForm from '../ProductForm'

//styles
import { toast } from 'react-hot-toast'
import { MagnifyingGlass, Rows, SquaresFour } from '@phosphor-icons/react'
import { useDebounce } from '@/hooks/useDebounce'


export default function Products() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category>()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [productName, setProductName] = useState<string>('')
  const [isGrid, setIsGrid] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const debouncedSearch = useDebounce(productName)


  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getProducts(debouncedSearch)
  }, [currentCategory, debouncedSearch])

  async function getCategories() {
    return await api_client.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(error => console.error(error))
  }

  async function getProducts(productName?: string) {

    const endpoint = currentCategory?.id
      ? `/products/category/${currentCategory?.id}?q=${productName || ''}`
      : `/products/search/name?q=${productName || ''}`;

    return await api_client.get(endpoint)
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error))
  }

  function openEditModal(product: Product) {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  function openDeleteAlert(product: Product) {
    setSelectedProduct(product)
    setIsAlertOpen(true)
  }

  function deleteProduct() {
    if (!selectedProduct) return
    api_client.delete(`/products/${selectedProduct.id}`)
      .then(({ data }) => setProducts(data))
      .catch(error => {
        console.error(error)
        toast.error('Erro ao excluir produto')
      })
      .finally(() => close())
  }

  function close() {
    setIsAlertOpen(false)
    setIsModalOpen(false)
    setSelectedProduct(undefined)
    getProducts()
  }

  return (
    <>
      <main className='flex flex-col h-full gap-6 w-full'>
        <h1 className='text-3xl font-satoshi-medium'>
          Produtos
        </h1>
        <div className="flex flex-col h-[85vh] text-typography-main relative overflow-hidden max-w-full bg-white shadow-lg rounded-xl pb-2">
          <header className='h-[68px] bg-white w-full flex items-center justify-between p-4'>
            <p className='text-typography-main font-satoshi-semibold text-xl'>
              Gerenciar Produtos
            </p>
            <br />
            <button
              disabled={!categories.length}
              onClick={() => setIsModalOpen(true)}
              title={!categories.length ? 'Cadastre uma categoria antes de cadastrar um produto' : undefined}
              className='bg-blue-800 disabled:opacity-40 text-white px-4 py-2 rounded-lg font-satoshi-medium'
            >
              Cadastrar Produto
            </button>
          </header>
          <section className='overflow-y-auto w-full scrollbar-hide'>
            <nav className="font-satoshi-medium flex flex-col sticky top-0 z-20 bg-white shadow-sm">
              <div className='flex overflow-x-auto scrollbar-hide'>
                <button
                  onClick={() => setCurrentCategory(undefined)}
                  className={`border-b-4 whitespace-nowrap ${!currentCategory ? "text-blue-800 border-blue-800" : "border-gray-100"} hover:bg-[#eee]/60 duration-300 rounded-t-lg w-fit px-6 py-3`}
                >
                  Todos
                </button>
                {categories?.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCategory(category)}
                    className={`border-b-4 whitespace-nowrap ${category.id === currentCategory?.id ? "text-blue-800 border-blue-800" : "border-gray-100"} hover:bg-[#eee]/60 duration-300 rounded-t-lg w-fit px-6 py-3`}
                  >
                    {category.name}
                  </button>
                ))}
                <span className='border-b-4 w-full border-gray-100' />
              </div>
              <header className='flex w-full p-3 gap-3'>
                <div className='flex w-full gap-2 items-center px-4 py-2 bg-gray-100 rounded-xl overflow-hidden'>
                  <MagnifyingGlass size={20} color='black' />
                  <input
                    className='bg-gray-100 focus:outline-none w-full'
                    onChange={e => setProductName(e.target.value)}
                    placeholder='Pesquisar produto...'
                    value={productName}
                  />
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setIsGrid(true)}
                    className={`${isGrid ? "bg-blue-800 text-white border-blue-800" : "bg-white hover:bg-gray-100"} border-2 duration-200 flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] rounded-lg font-satoshi-medium`}
                  >
                    <SquaresFour size={20} />
                  </button>
                  <button
                    onClick={() => setIsGrid(false)}
                    className={`${!isGrid ? "bg-blue-800 text-white border-blue-800" : "bg-white hover:bg-gray-100"} border-2 duration-200 flex-shrink-0 flex items-center justify-center w-[40px] h-[40px] rounded-lg font-satoshi-medium`}
                  >
                    <Rows size={20} />
                  </button>
                </div>
              </header>
            </nav>
            <ProductList
              isGrid={isGrid}
              products={products}
              openEditModal={openEditModal}
              openDeleteAlert={openDeleteAlert}
            />
          </section>
        </div>
      </main>
      <Alert
        onConfirm={() => deleteProduct()}
        isOpen={!!selectedProduct && isAlertOpen}
        close={() => close()}
        title={`Excluir produto "${selectedProduct?.name}"`}
        message='Tem certeza que deseja excluir este produto?'
        warning='Esta ação não poderá ser desfeita.'
      />
      <Modal
        isOpen={isModalOpen}
        close={() => close()}
        title={selectedProduct?.id ? 'Editar produto' : 'Adicionar produto'}
      >
        <ProductForm
          categories={categories}
          getProducts={getProducts}
          close={() => close()}
          product={{ ...selectedProduct, category_id: selectedProduct?.category_id || currentCategory?.id } as Product}
        />
      </Modal>
    </>
  )
}