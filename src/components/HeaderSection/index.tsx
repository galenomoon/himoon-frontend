import React, { useEffect, useRef } from "react"
import Image from "next/image"

//assets
import logo from "@/assets/complete_logo.png"

//next
import { useRouter } from "next/router"
import Link from "next/link"

export default function HeaderSection() {
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    scrollToTop(asPath)
  }, [asPath])

  function scrollToTop(currentPath: string) {
    if (currentPath !== "/") return
    return currentSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={currentSectionRef}
      className="flex h-screen w-full max-w-[1300px] items-center justify-between sm:flex-col-reverse sm:gap-4 md:flex-row md:gap-0"
    >
      <article className="flex h-full flex-col gap-3 sm:justify-start sm:text-center md:justify-center md:text-start">
        <h1 className="font-windsor sm:text-5xl md:text-7xl">
          A sua papelaria <br className="sm:hidden md:block" />
          criativa
        </h1>
        <p className="text-lg">
          Encontre os melhores produtos de artigo de papelaria
          <br />
          aqui na Hi, Moon! Juntamos o útil ao adorável
        </p>
        <Link
          href="/produtos"
          className="my-4 flex-shrink-0 rounded-full bg-typography-primary px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:bg-background-secondary sm:w-[90%] sm:self-center sm:px-0 md:w-fit md:self-start md:px-12"
        >
          Ver produtos
        </Link>
      </article>
      <aside className="flex flex-col items-center sm:h-[24rem] sm:w-auto sm:justify-end md:h-full md:justify-center">
        <Image
          src={logo}
          alt="logo"
          width={512}
          height={512}
          className="object-contain sm:h-[80%] md:h-[60%]"
        />
      </aside>
    </section>
  )
}
