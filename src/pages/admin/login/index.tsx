import React, { useState } from 'react'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

//styles
import { IoIosArrowRoundBack } from 'react-icons/io'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Toaster, toast } from 'react-hot-toast'

//interfaces
import { User } from '@/interfaces/user'

//components
import NextHeader from '@/components/NextHeader'

export default function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' })
  const [isHidden, setIsHidden] = React.useState(true)

  const { push } = useRouter()

  const date = new Date()
  const year = date.getFullYear()


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    push('/admin/')
    toast.success('Login efetuado com sucesso!')
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

      <nav className='relative flex flex-col md:w-[400px] sm:w-[96vw] gap-4 bg-white rounded-[52px] md:shadow-xl md:p-10 sm:py-10 sm:px-4'>
        <section className='flex flex-col gap-2'>
          <h1 className='text-3xl text-center font-satoshi-bold'>Login</h1>
          <span className='text-sm  opacity-60 text-center'>
            Olá, insira suas credenciais para acessar o <br />
            painel de administração
          </span>
        </section>
        <form onSubmit={handleLogin} className='flex flex-col gap-5'>
          <section className='flex flex-col gap-1'>
            <label className='text-sm font-satoshi-regular'>Email</label>
            <input
              required
              value={user.email}
              type='email'
              onChange={e => setUser({ ...user, email: e.target.value })}
              placeholder="Digite seu email"
              className='border border-gray-300 rounded-full px-6 py-2 outline-none'
            />
          </section>
          <section className='flex flex-col gap-1'>
            <label className='text-sm font-satoshi-regular'>Senha</label>
            <div className='flex w-full relative'>
              <input
                required
                value={user.password}
                placeholder='********'
                onChange={e => setUser({ ...user, password: e.target.value })}
                type={isHidden ? 'password' : 'text'}
                className='border border-gray-300 rounded-full px-6 py-2 outline-none w-full'
              />
              <button
                type='button'
                onClick={() => setIsHidden(!isHidden)}
                className='absolute self-center right-3 opacity-80'
              >
                {isHidden ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </section>
          <button
            type='submit'
            className='bg-blue-600 flex-shrink-0 my-4 text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-80 transition duration-300 ease-in-out'
          >
            Entrar
          </button>
        </form>
        <p className='absolute self-center -bottom-10 opacity-40'>
          © {year} - Todos os direitos reservados
        </p>
      </nav>
      <Toaster />
    </main>
  )
}
