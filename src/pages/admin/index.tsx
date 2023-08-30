
//components
import Menu from '@/components/Admin/Menu'
import Welcome from '@/components/Admin/Welcome'
import NextHeader from '@/components/NextHeader'
import Products from '@/components/Admin/Products'
import Categories from '@/components/Admin/Categories'

//next
import { useRouter } from 'next/router'

//styles
import { Toaster } from 'react-hot-toast'

//context

import { useContext } from 'react'
import { ThemeContext } from '@/contexts/themeContext'


export default function AdminSide() {
  const { query } = useRouter()
  const currentOption = query.option || 'welcome'
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className={`${isDarkMode ? 'dark' : ''} duration-300`}>
      <main className='relative flex min-h-screen w-fit font-satoshi-regular sm:bg-white dark:text-white  dark:md:bg-[#333] md:bg-[#eee]'>
        <NextHeader title='Administração - Hi, Moon Store | Dashboard' />
        <Menu />
        <section className='flex flex-col px-12 pt-12 w-[calc(100vw-324px)]'>
          {currentOption === 'welcome' && <Welcome />}
          {currentOption === 'categorias' && <Categories />}
          {currentOption === 'produtos' && <Products />}
        </section>
        <Toaster position='top-right' />
      </main>
    </div>
  )
}