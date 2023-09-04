import React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface SearchBarProps {
  setText: (text: string) => void
  text: string
}

export default function SearchBar({ setText = () => { }, text }: SearchBarProps) {
  return (
    <div className='flex w-full gap-4 items-center px-5 py-2 bg-white border border-black/10 rounded-xl overflow-hidden'>
      <MagnifyingGlass size={22} color='black' className='opacity-60' />
      <input
        className='bg-transparent text-typography-black focus:outline-none font-satoshi-regular w-full'
        onChange={e => setText(e.target.value)}
        placeholder='Pesquisar produto...'
        value={text}
      />
    </div>
  )
}
