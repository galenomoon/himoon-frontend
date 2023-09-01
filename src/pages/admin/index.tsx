
//components
import Menu from '@/components/Admin/Menu'
import Welcome from '@/components/Admin/Welcome'
import NextHeader from '@/components/NextHeader'
import Products from '@/components/Admin/Products'
import Categories from '@/components/Admin/Categories'

//next
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'

//styles
import { Toaster } from 'react-hot-toast'
import authMiddleware from '@/middlewares/authMiddleware'

export default function AdminSide() {
  const { query } = useRouter()
  const currentOption = query.option || 'welcome'

  return (
    <main className='relative flex min-h-screen w-fit font-satoshi-regular sm:bg-white md:bg-[#eee]'>
      <NextHeader title='Administração - Hi, Moon Store | Dashboard' />
      <Menu />
      <section className='flex flex-col px-12 pt-12 w-[calc(100vw-324px)]'>
        {currentOption === 'welcome' && <Welcome />}
        {currentOption === 'categorias' && <Categories />}
        {currentOption === 'produtos' && <Products />}
      </section>
      <Toaster position='top-right' />
    </main>
  )
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return authMiddleware(ctx)
}
