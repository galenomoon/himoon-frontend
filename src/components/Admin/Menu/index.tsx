import React from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router';

//styles
import { Basket, SquaresFour, Link as LinkIcon, Gauge, SignOut } from "@phosphor-icons/react";

export default function Menu() {
  const { query } = useRouter()

  const options = [
    {
      title: 'E-COMMERCE',
      routes: [
        {
          Icon: Basket,
          title: 'Meus Produtos',
          href: '/admin/dashboard/meus-produtos'
        },
        {
          Icon: SquaresFour,
          title: 'Categorias',
          href: '/admin/dashboard/categorias'
        },
        {
          Icon: LinkIcon,
          title: 'Redes Sociais',
          href: '/admin/dashboard/redes-sociais'
        },
        {
          Icon: Gauge,
          title: 'Estatísticas',
          href: '/admin/dashboard/estatisticas'
        }
      ]
    },
  ]

  return (
    <nav className='h-screen flex-shrink-0 w-[324px] bg-white shadow-lg flex flex-col'>
      <div className='flex px-8 w-full items-center justify-center pt-12 pb-6'>
        <p className='font-satoshi-medium text-3xl'>
          👋 Seja bem-vindo
        </p>
      </div>
      <span className='w-[80%] self-center h-[2px] bg-black/10' />
      <nav className='flex flex-col h-full'>
        {options?.map((option, index) => (
          <section key={index} className='flex flex-col mt-6'>
            <p className='font-satoshi-bold opacity-80 px-8 mb-4'>
              {option.title}
            </p>
            {option?.routes?.map((route, route_index) => (
              <Link
                key={route_index}
                href={route.href}
                className={`text-xl px-8 py-3 ${route.href === `/admin/dashboard/${query.option}` ? "text-blue-800 border-blue-800 bg-blue-800/10" : "opacity-60 border-transparent hover:bg-[#eee] duration-300"} border-r-4 flex items-center gap-5 font-satoshi-medium`}
              >
                <route.Icon size={26} weight="duotone" />
                <p>
                  {route.title}
                </p>
              </Link>
            ))}
          </section>
        ))}
      </nav>
      <span className='w-[80%] self-center h-[2px] bg-black/10' />
      <div className='flex px-8 gap-2 text-red-600 w-full items-center justify-center py-6 pb-12'>
        <SignOut size={22} weight="duotone" />
        <p>
          Sair
        </p>
      </div>
    </nav>
  )
}
