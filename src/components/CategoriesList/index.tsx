import React from 'react'

//interfaces
import { ICategory } from '@/interfaces/category'

//next
import Link from 'next/link'

interface CategoryListProps {
  categories: ICategory[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <section className='flex flex-col w- h-full rounded-xl bg-background-light py-9'>
      <ul>
        {categories.map(category => (
          <Link href={`#${category.name.toLowerCase()}`} key={category.id} className='w-[300px] max-w-[16vw] flex items-center hover:bg-[#eee] px-6 py-4'>
            {category.name}
          </Link>
        ))}
      </ul>
    </section>
  )
}
