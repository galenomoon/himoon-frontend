import React from 'react'
import Image from 'next/image'

//assets
import logo from '@/assets/complete_logo.png'

export default function HeaderSection() {
  return (
    <section className='flex max-w-[1300px] items-center justify-between w-full h-screen'>
      <article className='flex flex-col h-full gap-3 justify-center'>
        <h1 className="font-windsor text-7xl">
          A sua papelaria <br /> criativa
        </h1>
        <p className="text-lg">
          Encontre os melhores produtos de artigo de papelaria<br />aqui na Hi, Moon! Juntamos o útil ao adorável
        </p>
      </article>
      <aside className='flex flex-col items-center h-full justify-center'>
        <Image src={logo} alt='logo' width={512} height={512} />
      </aside>
    </section>
  )
}
