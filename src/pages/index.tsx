//components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Separator from "@/components/Separator"
import HeaderSection from "@/components/HeaderSection"
import ProductsSection from "@/components/ProductsSection"

export default function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col text-typography-primary bg-background-primary justify-center items-center sm:px-4 md:px-24'>
      <Header />
      <HeaderSection />
      <Separator
        title='Produtos em destaque'
        description='Os produtos mais vendidos da loja'
      />
      <ProductsSection />
      <Footer />
    </main>
  )
}
