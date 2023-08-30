import React, { useContext } from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router';

//styles
import { Basket, SquaresFour, SignOut, UserCircle } from "@phosphor-icons/react";

//components
import Toggle from '../Toggle';

//config
import { destroyCookie } from 'nookies';

//context
import { ThemeContext } from '@/contexts/themeContext';

export default function Menu() {
  const { query, push } = useRouter()
  const { isDarkMode, switchTheme } = useContext(ThemeContext)

  const options = [
    {
      title: 'E-COMMERCE',
      routes: [
        {
          Icon: Basket,
          title: 'Meus Produtos',
          href: '/admin/produtos'
        },
        {
          Icon: SquaresFour,
          title: 'Categorias',
          href: '/admin/categorias'
        },
        // {
        //   Icon: LinkIcon,
        //   title: 'Redes Sociais',
        //   href: '/admin/redes-sociais'
        // },
        // {
        //   Icon: Gauge,
        //   title: 'Estatísticas',
        //   href: '/admin/estatisticas'
        // }
      ]
    },
    {
      title: 'CONFIGURAÇÕES',
      routes: [
        {
          Icon: UserCircle,
          title: 'Meu Perfil',
          href: '/admin/perfil'
        }
      ]
    }
  ]

  async function handleSignOut() {
    destroyCookie(undefined, 'token')
    return push('/admin/login')
  }

  return (
    <nav className='h-screen flex-shrink-0 w-[324px] dark:bg-gray-800 bg-white shadow-lg flex flex-col'>
      <div className='flex px-8 w-full items-center justify-center pt-12 pb-6'>
        <p className='font-satoshi-medium text-3xl'>
          👋 Seja bem-vindo
        </p>
      </div>
      <span className='w-[80%] self-center h-[2px] bg-black/10 dark:bg-white/10' />
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
                className={`text-xl px-8 py-3 ${route.href === `/admin/${query.option}` ? "text-blue-800 border-blue-800 bg-blue-800/10 dark:text-blue-300 dark:border-blue-300 dark:bg-blue-300/10" : "opacity-60 border-transparent dark:hover:bg-blue-300/20 hover:bg-[#eee] duration-300"} border-r-4 flex items-center gap-5 font-satoshi-medium`}
              >
                <route.Icon size={26} weight="duotone" />
                <p>
                  {route.title}
                </p>
              </Link>
            ))}
          </section>
        ))}
        <div
          onClick={switchTheme}
          className="text-xl cursor-pointer select-none px-8 py-3 opacity-60 border-transparent hover:bg-[#eee] dark:hover:bg-blue-300/20 duration-300 border-r-4 flex items-center gap-5 font-satoshi-medium"
        >
          <Toggle isActive={isDarkMode} onChange={switchTheme} />
          <p>
            Modo Escuro
          </p>
        </div>
      </nav>
      <span className='w-[80%] self-center h-[2px] bg-black/10 dark:bg-white/10' />
      <button
        onClick={handleSignOut}
        className='flex px-8 gap-2 text-red-600 w-full items-center justify-center py-6 pb-12'
      >
        <SignOut size={22} weight="duotone" />
        <p>
          Sair
        </p>
      </button>
    </nav>
  )
}
