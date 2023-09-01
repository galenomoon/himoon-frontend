import { ICategory } from '@/interfaces/category'
import Link from 'next/link'
import React from 'react'

interface CategoryListProps {
  categories: ICategory[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <section>
      <ul className='flex flex-col h-[90%] rounded-xl bg-white py-9'>
        {categories.map(category => (
          <Link href={`#${category.name.toLowerCase()}`} key={category.id} className='w-[300px] max-w-[16vw] flex items-center hover:bg-[#eee] px-6 py-4'>
            {category.name}
          </Link>
        ))}
      </ul>
    </section>
  )
}
