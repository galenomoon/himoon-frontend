import Header from "@/components/Header"
import Image from "next/image"

//assets
import Logo from '@/assets/complete_logo.png'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col text-typography-primary bg-background-primary justify-center items-center px-24'>
      <Header />
      <section className='flex max-w-[1300px] items-center justify-between w-full h-full'>
        <article className='flex flex-col h-full gap-3 justify-center'>
          <h1 className="font-windsor text-7xl">
            A sua papelaria <br /> criativa
          </h1>
          <p className="text-lg">
            Encontre os melhores produtos de artigo de papelaria<br />aqui na Hi, Moon! Juntamos o útil ao adorável
          </p>
        </article>
        <aside className='flex flex-col items-center h-full justify-center'>
          <Image src={Logo} alt='logo' width={512} height={512} />
        </aside>
      </section>
    </main>
  )
}
