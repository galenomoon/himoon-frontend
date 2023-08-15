import React from 'react'

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
