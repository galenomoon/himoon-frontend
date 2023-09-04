import React from 'react'
import Image from 'next/image'

//assets
import logo from '@/assets/complete_logo.png'

export default function Separator({ title, description }: { title: string, description: string }) {
  return (
    <section className='w-screen py-2 text-white bg-background-secondary flex flex-col justify-center text-center'>
      <span className='dashed-border h-1' />
      <article className='flex flex-col py-14 h-full items-center'>
        <h2 className='sm:text-4xl md:text-6xl font-bold font-windsor'>{title}</h2>
        <p className='text-lg'>{description}</p>
      </article>
      <span className='dashed-border h-1' />
    </section>
  )
}

export function HeaderSeparator({ title, description }: { title: string, description: string }) {
  return (
    <section className='w-screen h-[32vh] py-y overflow-hidden relative text-white bg-gradient-to-r from-[#C0B4EB] to-[#EBAFFF] flex flex-col justify-between'>
      <span className='dashed-border h-1 mt-2 z-[1]' />
      <div className='flex px-28 items-center justify-between'>
        <article className='flex flex-col py-14 h-full'>
          <h2 className='sm:text-4xl md:text-6xl font-bold font-windsor'>{title}</h2>
          <p className='text-sm w-[60%]'>{description}</p>
        </article>
        <Image src={logo} alt='logo' width={1000} height={1000} className='absolute z-0 w-[500px] right-36 self-center object-cover' />
      </div>
      <span className='dashed-border h-1 mb-2 z-[1]' />
    </section>
  )
}
