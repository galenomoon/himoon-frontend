import React, { useEffect, useState } from 'react'

//interfaces
import { Product } from '@/interfaces/product'
import { Category } from '@/interfaces/category'

//config
import api_client from '@/config/api_client'
import { MagnifyingGlass, Rows, SquaresFour } from '@phosphor-icons/react'
import ProductList from '../ProductList'


export default function Products() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category>()
  const [products, setProducts] = useState<Product[]>([])
  const [productName, setProductName] = useState<string>('')
  const [isGrid, setIsGrid] = useState<boolean>(true)

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getProducts()
  }, [currentCategory, productName])

  async function getCategories() {
    return await api_client.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(error => console.error(error))
  }

  async function getProducts() {
    return await api_client.get(`/products/category/${currentCategory?.id}?q=${productName}`)
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error))
  }

  return (
    <main className='flex flex-col h-full gap-6'>
      <h1 className='text-3xl font-satoshi-medium'>
        Produtos
      </h1>
      <div className="flex flex-col h-full text-typography-main relative overflow-hidden w-full bg-white shadow-lg rounded-xl pb-2">
        <header className='h-[68px] bg-white w-full flex items-center justify-between p-4'>
          <p className='text-typography-main font-satoshi-semibold text-xl'>
            Gerenicar Produtos
          </p>
          <br />
          <button className='bg-blue-800 text-white px-4 py-2 rounded-lg font-satoshi-medium'>
            Cadastrar Produto
          </button>
        </header>
        <section className='overflow-auto w-full'>
          <nav className="font-satoshi-medium flex flex-col sticky top-0 z-10 bg-white shadow-sm">
            <div className='flex'>
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
          <ProductList products={products} isGrid={isGrid} />
        </section>
      </div>
    </main>
  )
}