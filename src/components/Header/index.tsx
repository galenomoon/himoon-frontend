import React from 'react'

//next
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

//assets
import horizontalLogo from '@/assets/horizontal_logo.png'

//mocks
import contacts from '@/mocks/contacts'

export default function Header() {
  const { pathname: currentPath } = useRouter()

  const routes = [
    {
      name: 'Início',
      path: '/'
    },
    {
      name: 'Produtos',
      path: '#'
    },
    {
      name: 'Contato',
      path: '#'
    }
  ]

  return (
    <header className='bg-background-primary flex flex-col items-center justify-center w-screen fixed top-0'>
      <div className='flex items-center justify-center w-full max-w-[1300px] py-6'>
        <nav className='flex items-center justify-between w-full'>
          {routes.map((route, index) =>
            <Link
              key={index}
              href={route.path}
              className={`flex items-center w-[142px] justify-center py-3 hover:text-typography-primary hover:bg-typography-primary/20 duration-200 rounded-full ${currentPath === route.path ? 'text-typography-secondary bg-typography-primary' : ''}`}
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
          {contacts.map((contact: any, index: number) =>
            <Link href={contact.url} key={index} className='h-[30px] w-[30px] flex justify-center items-center'>
              <contact.Icon />
            </Link>
          )}
        </nav>
      </div>
    </header >
  )
}
