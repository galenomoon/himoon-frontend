import React from 'react'

//next
import Link from 'next/link'
import Image from 'next/image'

//assets
import galenomoon_logo from '@/assets/galenomoon_logo.svg'

//mocks
import contacts from '@/mocks/contacts'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className='w-screen py-2 text-white bg-background-secondary flex flex-col justify-center text-center'>
      <span className='dashed-border h-1' />
      <article className='flex w-full pt-14 pb-24 text-typography-primary h-full items-center self-center max-w-[1300px]'>
        <nav className='flex flex-col w-full gap-4 text-start'>
          <Link href="/">
            Início
          </Link>
          <Link href="">
            Produtos
          </Link>
          <Link href="">
            Contato
          </Link>
        </nav>
        <nav className='flex flex-col w-full gap-4 text-start'>
          <Link href="">
            Informações
          </Link>
          <Link href="">
            Termos de uso
          </Link>
          <Link href="">
            Política de privacidade
          </Link>
        </nav>
        <nav className='flex flex-col w-full gap-4 text-start'>
          {contacts.map((contact: any, index: number) =>
            <Link href={contact.url} key={index} className='flex gap-2 items-center'>
              <contact.Icon size={22} />
              <p>
                {contact.title}
              </p>
            </Link>
          )}
        </nav>
        <aside className='flex flex-col w-full gap-3 items-end'>
          <p>
          © {year} - Todos os direitos reservados
          </p>
          <p>
            Desenvolvido por <a href="https://www.galenomoon.com" target="_blank" rel="noopener noreferrer" className='text-primary'>Guilherme Galeno</a>
          </p>
          <Image
            src={galenomoon_logo}
            height={40}
            alt='Logo'
          />
        </aside>
      </article>
      <span className='dashed-border h-1' />
    </footer>
  )
}
