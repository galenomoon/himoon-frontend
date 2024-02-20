import React from "react"

//next
import Link from "next/link"
import Image from "next/image"

//assets
import galenomoon_logo from "@/assets/galenomoon_logo.svg"

//mocks
import contacts from "@/mocks/contacts"

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <>
      {/* Mobile Footer */}
      <footer className="flex w-screen flex-col justify-center bg-background-secondary py-2 text-center text-white md:hidden">
        <span className="dashed-border h-1" />
        <article className="flex h-full w-full max-w-[1300px] flex-col items-center justify-center self-center pb-16 pt-12 text-typography-primary">
          <nav className="flex w-full items-center justify-center gap-4">
            {contacts.map((contact: any, index: number) => (
              <Link href={contact.url || "#"} key={index}>
                <contact.Icon size={28} />
              </Link>
            ))}
          </nav>
          <aside className="mt-8 flex w-full flex-col items-center">
            <p>© {year} - Todos os direitos reservados</p>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://www.galenomoon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Guilherme Galeno
              </a>
            </p>
            <Image
              alt="Logo"
              height={40}
              src={galenomoon_logo}
              className="mt-4"
            />
          </aside>
        </article>
        <span className="dashed-border h-1" />
      </footer>
      {/* Desktop Footer */}
      <footer className="flex w-screen flex-col justify-center bg-background-secondary py-2 text-center text-white sm:hidden md:flex">
        <span className="dashed-border h-1" />
        <article className="flex h-full w-full max-w-[1300px] self-center px-10 pb-24 pt-14 text-typography-primary">
          <nav className="flex w-full flex-col gap-4 text-start">
            <Link href="/">Início</Link>
            <Link href="">Produtos</Link>
            <Link href="">Contato</Link>
          </nav>
          <nav className="flex w-full flex-col gap-4 text-start">
            <Link href="">Informações</Link>
            <Link href="">Termos de uso</Link>
            <Link href="">Política de privacidade</Link>
          </nav>
          <nav className="flex w-full flex-col gap-4 text-start">
            {contacts.map((contact: any, index: number) => (
              <Link
                href={contact.url}
                key={index}
                className="flex items-center gap-2"
              >
                <contact.Icon size={22} />
                <p>{contact.title}</p>
              </Link>
            ))}
          </nav>
          <aside className="flex w-full flex-col items-end whitespace-nowrap text-end">
            <p>© {year} - Todos os direitos reservados</p>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://www.galenomoon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guilherme Galeno
              </a>
            </p>
            <Image
              alt="Logo"
              height={40}
              className="mt-6"
              src={galenomoon_logo}
            />
          </aside>
        </article>
        <span className="dashed-border h-1" />
      </footer>
    </>
  )
}
