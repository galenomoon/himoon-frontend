import { useEffect, useState } from "react"

//config
import api_client from "@/config/api_client"

//components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import NextHeader from "@/components/NextHeader"
import ProductGrid from "@/components/ProductGrid"
import { HeaderSeparator } from "@/components/Separator"
import CategoriesList from "@/components/CategoriesList"

//interfaces
import { IProduct } from "@/interfaces/product"
import { ICategory } from "@/interfaces/category"

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  async function getProducts() {
    return await api_client.get('/products?q=')
      .then(({ data }) => setProducts(data))
      .catch(console.error)
  }

  async function getCategories() {
    return await api_client.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(console.error)
  }

  return (
    <main className='flex min-h-screen flex-col text-typography-primary bg-background-primary items-center sm:px-4 relative'>
      <NextHeader />
      <Header />
      <HeaderSeparator
        title='Todos os Produtos'
        description='Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais.'
      />
      <section className='flex md:px-24 gap-6  rounded-xl flex-col w-full h-full'>
        <header className="flex w-full justify-between items-center rounded-xl p-6 bg-background-light ">
          <p className='text-xl font-satoshi-medium'>
            Resultados ({products.length})
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-satoshi-regular">ORDENAR POR:</p>
            <select className={`bg-white outline-none text-black rounded-lg text-sm border h-10 w-[128px] px-2`}>
              <option value="name">Nome</option>
              <option value="price">Preço</option>
            </select>
          </div>
        </header>

        <section className="flex gap-4 min-h-screen">
          <CategoriesList categories={categories} />
          <ProductGrid products={products} />
        </section>
      </section>
      <Footer />
    </main>
  )
}
