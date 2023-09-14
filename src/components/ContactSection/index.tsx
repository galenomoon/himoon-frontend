import React, { useEffect, useRef } from "react"

//mocks
import contacts from "@/mocks/contacts"

//components
import SectionTitle from "../SectionTitle"

//next
import Link from "next/link"
import { useRouter } from "next/router"

export default function ContactSection() {
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    scrollToContact(asPath)
  }, [asPath])

  function scrollToContact(currentPath: string) {
    if (currentPath !== "/#contato") return
    return currentSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={currentSectionRef}
      className="flex h-fit min-h-screen w-full max-w-[1300px] flex-col items-center gap-16 py-24"
    >
      <SectionTitle>Nos acompanhe no Instagram</SectionTitle>
      <article className="flex w-full justify-center gap-6 sm:h-[764px] sm:flex-col-reverse md:h-[670px] md:flex-row">
        <aside className="flex h-full w-full">
          <iframe
            src={`${process.env.NEXT_PUBLIC_INSTAGRAM_URL}/embed/?cr=1&amp;v=12&amp;wp=540&amp;rd=https%3A%2F%2Fwww.embedista.com&amp;rp=%2Finstagramfeed#%7B%22ci%22%3A0%2C%22os%22%3A195988.8999999999%2C%22ls%22%3A195694.2999999998%2C%22le%22%3A195979.5%7D`}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "3px",
              border: "1px solid rgb(219, 219, 219)",
            }}
          />
        </aside>
        <aside className="flex flex-col items-center p-6 sm:w-full sm:justify-center sm:gap-6 md:w-fit md:justify-start md:gap-12">
          <p className="font-satoshi-bold text-center sm:text-3xl md:text-4xl">
            Nossas <br />
            <span className="whitespace-nowrap">redes sociais:</span>
          </p>
          <article className="font-satoshi-regular flex flex-col items-center justify-center gap-2 text-xl sm:flex-wrap md:flex-nowrap">
            {contacts.map((contact: any, index: number) => (
              <Link
                href={contact.url}
                key={index}
                className="flex items-center  justify-center gap-3 rounded-full px-6 py-3 duration-200 hover:bg-typography-primary/20 hover:text-typography-primary"
              >
                <contact.Icon size={26} className="flex-shrink-0" />
                <p>{contact.title}</p>
              </Link>
            ))}
          </article>
        </aside>
      </article>
    </section>
  )
}
