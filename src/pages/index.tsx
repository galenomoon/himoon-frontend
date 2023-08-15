//components
import Header from "@/components/Header"
import Separator from "@/components/Separator"
import HeaderSection from "@/components/HeaderSection"

export default function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col text-typography-primary bg-background-primary justify-center items-center px-24'>
      <Header />
      <HeaderSection />
      <Separator
        title='Produtos em destaque'
        description='Os produtos mais vendidos da loja'
      />
    </main>
  )
}
