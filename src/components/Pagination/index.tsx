import React from 'react'

//styles
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export default function Pagination() {
  return (
    <section className='flex rounded-full gap-2 py-2 bg-background-light'>
      <p className='whitespace-nowrap pl-5'>
        <span className='font-satoshi-bold'>1</span> 
        <span className='font-satoshi-light'> de </span>
        <span className='font-satoshi-medium opacity-80'>10</span>
      </p>
      <aside className='flex gap-2 pr-3'>
        <button>
          <CaretLeft size={20} weight='bold' />
        </button>
        <button>
          <CaretRight size={20} weight='bold' />
        </button>
      </aside>
    </section>
  )
}
