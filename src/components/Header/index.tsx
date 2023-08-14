import React from 'react'

//next
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

//assets
import horizontalLogo from '@/assets/horizontal_logo.png'

//styles
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { SiShopee } from 'react-icons/si'

export default function Header() {
  const { pathname: currentPath } = useRouter()

  const routes = [
    {
      name: 'Início',
      path: '/'
    },
    {
      name: 'Produtos',
      path: '/produtos'
    },
    {
      name: 'Contato',
      path: '/contato'
    }
  ]

  return (
    <header className='flex items-center fixed top-0 justify-center w-full max-w-[1300px] py-6'>
      <nav className='flex items-center gap-8 w-full'>
        {routes.map((route, index) =>
          <Link
            key={index}
            href={route.path}
            className={`flex items-center justify-center px-12 py-3 rounded-full ${currentPath === route.path ? 'text-typography-secondary bg-typography-primary' : ''}`}
          >
            <p>{route.name}</p>
          </Link>
        )}
      </nav>
      <nav className='flex items-center justify-center w-full'>
        <Image
          src={horizontalLogo}
          alt="logo"
          width={128}
          height={128}
        />
      </nav>
      <nav className='flex items-center text-3xl justify-end gap-6 w-full'>
        <Link href='/'>
          <FaInstagram />
        </Link>
        <Link href='/'>
          <FaWhatsapp />
        </Link>
        <Link href='/'>
          <SiShopee />
        </Link>
      </nav>
    </header>
  )
}
