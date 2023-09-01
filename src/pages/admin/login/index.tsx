import React, { useContext, useState } from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Toaster } from 'react-hot-toast'

//interfaces
import { User } from '@/interfaces/user'

//components
import NextHeader from '@/components/NextHeader'
import AuthForm from '@/components/Admin/AuthForm'

//contexts
import { UserContext } from '@/contexts/UserContext'

export default function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' })
  const [isLoaded, setIsLoaded] = useState(true)
  const { login } = useContext(UserContext)

  const { push } = useRouter()

  const date = new Date()
  const year = date.getFullYear()

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()

    setIsLoaded(false)
    try {
      login(user, () => push('/admin/'))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoaded(true)
    }
  }

  return (
    <main className='relative flex min-h-screen flex-col font-satoshi-regular sm:bg-white md:bg-[#eee] justify-center items-center sm:px-4 md:px-24'>
      <NextHeader title='Administração - Hi, Moon Store | Login' />
      <Link href='/' className='flex group hover:text-blue-600 duration-200 flex-col gap-3 absolute left-3 top-3 p-3 hover:bg-blue-600/10 rounded-2xl' >
        <h1 className='text-2xl font-satoshi-bold'>Hi, Moon Store</h1>
        <div className='w-[228px] h-[2px] duration-200 group-hover:bg-blue-600/20 bg-black/40' />
        <div className='flex text-sm items-center gap-2'>
          <IoIosArrowRoundBack size={20} />
          <p>
            Voltar para o site
          </p>
        </div>
      </Link>
      <nav className='relative flex flex-col md:w-[400px] sm:w-[96vw] gap-4 bg-white rounded-[12px] md:shadow-xl md:p-10 sm:py-10 sm:px-4'>
        <section className='flex flex-col gap-2'>
          <h1 className='text-3xl text-center font-satoshi-bold'>Login</h1>
          <span className='text-sm  opacity-60 text-center'>
            Olá, insira suas credenciais para acessar o <br />
            painel de administração
          </span>
        </section>
        <AuthForm
          user={user}
          setUser={setUser}
          isLoaded={isLoaded}
          handleAuth={handleAuth}
        />
        <p className='absolute self-center -bottom-10 opacity-40'>
          © {year} - Todos os direitos reservados
        </p>
      </nav>
      <Toaster position='top-right' />
    </main>
  )
}
