import React from 'react'

//next
import Link from 'next/link'

//styles
import { CaretRight } from '@phosphor-icons/react'

export default function Breadcrump() {
  return (
    <section className='flex gap-6 border-b-[2px] py-7 border-black/5 underline items-center'>
      <Link href='/'>
        Início 
      </Link>
      <CaretRight size={18} weight="bold" />
      <Link href='/produtos' className=''>
        Produtos
      </Link>
    </section>
  )
}
