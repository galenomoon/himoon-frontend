import React, { useState } from "react"

//next
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

//assets
import admoonLogo from "@/assets/admoon.png"

//styles
import { IoIosArrowRoundBack } from "react-icons/io"
import { Toaster, toast } from "react-hot-toast"

//interfaces
import { IUser } from "@/interfaces/user"

//components
import NextHeader from "@/components/NextHeader"
import AuthForm from "@/components/Admin/AuthForm"

//config
import { setCookie } from "nookies"
import api_client from "@/config/api_client"

export default function Login() {
  const [user, setUser] = useState<IUser>({ email: "", password: "" })
  const [isLoaded, setIsLoaded] = useState(true)

  const { push } = useRouter()

  const date = new Date()
  const year = date.getFullYear()

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()

    setIsLoaded(false)
    await api_client
      .post("/auth/login", user)
      .then(({ data }) => {
        setCookie(undefined, "token", data.token)
        push("/admin/")
      })
      .catch((err) => {
        console.error(err)
        if (err.response.status === 401) {
          return toast.error("Email ou senha incorretos")
        }
        if (err.response.status === 404) {
          return toast.error("Usuário não encontrado")
        }
        if (err.response.status === 500) {
          return toast.error("Algo deu errado, tente novamente mais tarde")
        }
      })
      .finally(() => setIsLoaded(true))
  }

  return (
    <main className="font-satoshi-regular relative flex min-h-screen flex-col items-center justify-center sm:bg-white sm:px-4 md:bg-[#eee] md:px-24">
      <NextHeader title="Administração - Hi, Moon Store | Login" />
      <Link
        href="/"
        className="group absolute left-3 top-3 flex flex-col gap-3 rounded-2xl p-3 duration-200 hover:bg-blue-600/10 hover:text-blue-600"
      >
        <h1 className="font-satoshi-bold text-2xl">Hi, Moon Store</h1>
        <div className="h-[2px] w-[228px] bg-black/40 duration-200 group-hover:bg-blue-600/20" />
        <div className="flex items-center gap-2 text-sm">
          <IoIosArrowRoundBack size={20} />
          <p>Voltar para o site</p>
        </div>
      </Link>
      <Image src={admoonLogo} alt="logo" width={400} height={60} className="mb-12 sm:hidden md:block absolute top-28" />
      <nav className="relative flex flex-col gap-4 rounded-[12px] bg-white sm:w-[96vw] sm:px-4 sm:py-10 md:w-[400px] md:p-10 md:shadow-xl">
        <section className="flex flex-col gap-2">
          <h1 className="font-satoshi-bold text-center text-3xl">Login</h1>
          <span className="text-center  text-sm opacity-60">
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
        <p className="absolute -bottom-10 self-center opacity-40">
          © {year} - Todos os direitos reservados
        </p>
      </nav>
      <Toaster position="top-right" />
    </main>
  )
}
