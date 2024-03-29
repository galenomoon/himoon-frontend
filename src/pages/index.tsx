//components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Separator from "@/components/Separator"
import NextHeader from "@/components/NextHeader"
import HeaderSection from "@/components/HeaderSection"
import ContactSection from "@/components/ContactSection"
import ProductsSection from "@/components/ProductsSection"

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background-primary text-typography-primary sm:px-4 md:px-24">
      <NextHeader />
      <Header fixed />
      <HeaderSection />
      <Separator
        title="Produtos em destaque"
        description="Os produtos mais vendidos da loja"
      />
      <ProductsSection />
      <Separator
        title="Contato"
        description="Entre em contato conosco para mais informações"
      />
      <ContactSection />
      <Footer />
    </main>
  )
}
