import React from 'react'

//next
import Link from 'next/link'

//interfaces
import { ICategory } from '@/interfaces/category'

interface ICategoriesBarProps {
  categories: ICategory[]
}

export default function CategoriesBar({ categories }: ICategoriesBarProps) {
  return categories.length > 0 && (
    <div className="sm:fixed md:relative sm:top-0 z-[22] flex items-center justify-center w-full animate-fade-in">
      <div className="flex md:px-24 overflow-scroll scrollbar-hide bg-typography-primary items-center justify-center w-full">
        <button className="absolute bg-gradient-to-r text-white from-typography-primary left-0 flex items-center justify-start px-6 h-full w-38">
        </button>
        <nav className="flex items-center w-full">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/produtos/${category.slug}`}
              className="w-fit flex items-center justify-center py-2 px-8 m-2 rounded-full hover:bg-white hover:text-typography-primary text-white whitespace-nowrap uppercase duration-200"
            >
              <p>{category.name}</p>
            </Link>
          ))}
        </nav>
        <button className="absolute bg-gradient-to-l text-white from-typography-primary right-0 flex items-center justify-end px-6 h-full w-38">
        </button>
      </div>
    </div>
  )
}
