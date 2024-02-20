import React, { useEffect, useRef, useState } from "react"

//config
import api_client from "@/config/api_client"

//components
import ProductGrid from "../ProductGrid"
import SectionTitle from "../SectionTitle"

//next
import Link from "next/link"
import { useRouter } from "next/router"

//interfaces
import { IProductPaginated } from "@/interfaces/product"

//styles
import { Basket } from "@phosphor-icons/react"

export default function ProductsSection() {
  const { asPath } = useRouter()
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<IProductPaginated>(
    {} as IProductPaginated,
  )

  useEffect(() => {
    scrollToProductsSection(asPath)
  }, [asPath])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    return await api_client
      .get(
        `websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/products?quantity=9`,
      )
      .then(({ data }) => setProducts(data))
      .catch(console.error)
  }

  function scrollToProductsSection(currentPath: string) {
    if (currentPath !== "/#produtos") return
    return currentSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={currentSectionRef}
      className="flex h-fit min-h-screen w-full max-w-[1300px] flex-col items-center gap-12 py-24"
    >
      <SectionTitle>Produtos em destaque</SectionTitle>
      <ProductGrid products={products.results} />
      <Link
        href="/produtos"
        className="my-4 flex flex-shrink-0 items-center justify-center gap-3 self-center rounded-full bg-typography-primary px-6 py-4 text-center text-xl font-bold uppercase text-white shadow-lg transition duration-300 ease-in-out hover:bg-opacity-80 sm:w-[90%] sm:px-0 md:w-fit md:px-12"
      >
        <Basket size={28} />
        <p>Ver todos os produtos</p>
      </Link>
    </section>
  )
}
