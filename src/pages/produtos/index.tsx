import { useEffect, useState } from "react"

//config
import api_client from "@/config/api_client"

//next
import { useRouter } from "next/router"

//components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import NextHeader from "@/components/NextHeader"
import Breadcrump from "@/components/Breadcrump"
import Pagination from "@/components/Pagination"
import ProductGrid from "@/components/ProductGrid"
import { HeaderSeparator } from "@/components/Separator"

//interfaces
import { IProductPaginated } from "@/interfaces/product"

//hooks
import { useDebounce } from "@/hooks/useDebounce"

export default function ProductsPage() {
  const { query } = useRouter()
  const { category_slug: categorySlug } = query
  const [productName, setProductName] = useState<string>("")
  const [products, setProducts] = useState<IProductPaginated>(
    {} as IProductPaginated,
  )
  const debouncedSearch = useDebounce(productName)

  useEffect(() => {
    getProducts()
    //eslint-disable-next-line
  }, [debouncedSearch, categorySlug])

  async function getProducts(page = 1) {
    const nameQuery = debouncedSearch ? `&q=${debouncedSearch}` : ""

    const endpoint = categorySlug
      ? `products/category/${categorySlug}?page=${page}${nameQuery}`
      : `products?page=${page}${nameQuery}`

    return await api_client
      .get(`websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/` + endpoint)
      .then(({ data }) => setProducts(data))
      .catch(console.error)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-background-primary text-typography-primary sm:px-4">
      <NextHeader
        title={`Produtos | Hi, Moon Store 🌙💖`}
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <Header fixed />
      <HeaderSeparator
        title="Produtos"
        description="Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
      />
      <section className="flex h-full w-full flex-col gap-6 rounded-xl pb-64 md:px-52">
        <Breadcrump />
        <header className="flex w-full items-center justify-between">
          <p className="font-satoshi-medium text-lg">
            Resultados ({products.totalItems})
          </p>
          <div className="flex items-center sm:gap-0 md:gap-4">
            <p className="md:text-lg">ORDENAR POR:</p>
            <select className="font-satoshi-light text-md bg-transparent px-2 text-black outline-none md:w-[128px]">
              <option value="name" selected>
                Nome
              </option>
              <option value="lowerPrice">Menor Preço</option>
              <option value="higherPrice">Maior Preço</option>
            </select>
          </div>
        </header>
        <section className="flex min-h-screen flex-col gap-6">
          <header className="flex items-center justify-between gap-4">
            <Pagination
              totalPages={products.totalPages}
              currentPage={products.currentPage}
              nextPage={getProducts}
              previousPage={getProducts}
            />
            <div className="w-full gap-2 sm:hidden md:flex">
              <SearchBar text={productName} setText={setProductName} />
            </div>
          </header>
          <div className="w-full gap-2 sm:block md:hidden">
            <SearchBar text={productName} setText={setProductName} />
          </div>
          <ProductGrid products={products.results} />
        </section>
      </section>
      <Footer />
    </main>
  )
}
