import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

//assets
import logo from '@/assets/complete_logo.png'

//next
import { useRouter } from 'next/router'

export default function HeaderSection() {
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    scrollToContact(asPath)
  }, [asPath])

  function scrollToContact(currentPath: string) {
    if (currentPath !== '/') return
    return currentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={currentSectionRef} className='flex sm:flex-col-reverse md:gap-0 sm:gap-4 md:flex-row max-w-[1300px] items-center justify-between w-full h-screen'>
      <article className='flex flex-col md:text-start sm:text-center h-full gap-3 sm:justify-start md:justify-center'>
        <h1 className="font-windsor sm:text-5xl md:text-7xl">
          A sua papelaria <br className='sm:hidden md:block' />
          criativa
        </h1>
        <p className="text-lg">
          Encontre os melhores produtos de artigo de papelaria<br />aqui na Hi, Moon! Juntamos o útil ao adorável
        </p>
        <button
          className='bg-typography-primary flex-shrink-0 my-4 md:w-fit md:px-12 sm:px-0 sm:w-[90%] md:self-start sm:self-center text-white font-bold py-3 px-6 rounded-full hover:bg-background-secondary transition duration-300 ease-in-out'
        >
          Saiba mais!
        </button>
      </article>
      <aside className='flex flex-col sm:w-auto sm:justify-end md:justify-center items-center md:h-full sm:h-[24rem]'>
        <Image
          src={logo}
          alt='logo'
          width={512}
          height={512}
          className='object-contain md:h-[60%] sm:h-[80%]'
        />
      </aside>
    </section>
  )
}
