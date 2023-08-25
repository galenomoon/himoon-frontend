
//components
import Menu from '@/components/Admin/Menu'
import NextHeader from '@/components/NextHeader'
import Categories from '@/components/Admin/Categories'

//next
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { query } = useRouter()
  const currentOption = query.option

  return (
    <main className='relative flex min-h-screen font-satoshi-regular sm:bg-white md:bg-[#eee]'>
      <NextHeader title='Administração - Hi, Moon Store | Dashboard' />
      <Menu />
      <section className='flex flex-col p-12 w-full h-screen'>
        {currentOption === 'meus-produtos' && <Categories />}
      </section>
    </main>
  )
}