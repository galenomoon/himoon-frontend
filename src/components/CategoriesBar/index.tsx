import React from "react"

//next
import Link from "next/link"

//interfaces
import { ICategory } from "@/interfaces/category"

interface ICategoriesBarProps {
  categories: ICategory[]
}

export default function CategoriesBar({ categories }: ICategoriesBarProps) {
  return (
    categories.length > 0 && (
      <div className="z-[22] flex w-full animate-fade-in items-center justify-center sm:fixed sm:top-0 md:relative">
        <div className="scrollbar-hide flex w-full items-center justify-center overflow-scroll bg-typography-primary md:px-24">
          <button className="w-38 absolute left-0 flex h-full items-center justify-start bg-gradient-to-r from-typography-primary px-6 text-white"></button>
          <nav className="flex w-full items-center">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/produtos/${category.slug}`}
                className="m-2 flex w-fit items-center justify-center whitespace-nowrap rounded-full px-8 py-2 uppercase text-white duration-200 hover:bg-white hover:text-typography-primary"
              >
                <p>{category.name}</p>
              </Link>
            ))}
          </nav>
          <button className="w-38 absolute right-0 flex h-full items-center justify-end bg-gradient-to-l from-typography-primary px-6 text-white"></button>
        </div>
      </div>
    )
  )
}
