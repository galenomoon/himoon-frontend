import React, { useEffect, useRef } from 'react'

//mocks
import contacts from '@/mocks/contacts'


//components
import SectionTitle from '../SectionTitle'

//next
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ContactSection() {
  const currentSectionRef = useRef<HTMLDivElement>(null)
  const { asPath } = useRouter()

  useEffect(() => {
    scrollToContact(asPath)
  }, [asPath])

  function scrollToContact(currentPath: string) {
    if (currentPath !== '/#contato') return
    return currentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={currentSectionRef} className='flex flex-col max-w-[1300px] gap-16 items-center py-24 w-full h-fit min-h-screen'>
      <SectionTitle>
        Nos acompanhe no Instagram
      </SectionTitle>
      <article className='flex md:flex-row sm:flex-col-reverse gap-6 justify-center w-full sm:h-[764px] md:h-[670px]'>
        <aside className='flex w-full h-full'>
          <iframe
            src={`${process.env.NEXT_PUBLIC_INSTAGRAM_URL}/embed/?cr=1&amp;v=12&amp;wp=540&amp;rd=https%3A%2F%2Fwww.embedista.com&amp;rp=%2Finstagramfeed#%7B%22ci%22%3A0%2C%22os%22%3A195988.8999999999%2C%22ls%22%3A195694.2999999998%2C%22le%22%3A195979.5%7D`}
            style={{ height: '100%', width: "100%", borderRadius: '3px', border: "1px solid rgb(219, 219, 219)" }}
          />
        </aside>
        <aside className='flex flex-col md:justify-start sm:justify-center sm:gap-6 md:gap-12 p-6 items-center sm:w-full md:w-fit'>
          <p className='font-satoshi-bold sm:text-3xl md:text-4xl text-center'>
            Nossas redes sociais:
          </p>
          <article className='font-satoshi-regular text-xl flex gap-2 md:flex-nowrap sm:flex-wrap items-center justify-center'>
            {contacts.map((contact: any, index: number) => (
              <Link href={contact.url} key={index} className='flex items-center  justify-center gap-3 px-6 py-3 hover:text-typography-primary hover:bg-typography-primary/20 duration-200 rounded-full'>
                <contact.Icon size={26} className="flex-shrink-0" />
                <p>
                  {contact.title}
                </p>
              </Link>
            ))}
          </article>
        </aside>
      </article>
    </section>
  )
}
