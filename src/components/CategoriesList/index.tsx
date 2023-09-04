import React from 'react'

//interfaces
import { ICategory } from '@/interfaces/category'


interface CategoryListProps {
  categoryId: number | null
  categories: ICategory[]
  setCategory: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CategoriesList({ categoryId, categories, setCategory = () => { } }: CategoryListProps) {

  return (
    <section className='flex flex-col w- h-full rounded-xl bg-background-light py-9 px-2'>
      <h2 className='text-2xl font-bold px-6'>Categorias:</h2>
      <span className='w-full my-4 h-[2px] bg-black/5' />
      <ul className='flex flex-col items-center justify-center gap-3'>
        <button
          onClick={() => setCategory(null)}
          className={`${!categoryId ? "bg-typography-primary text-white" : "bg-white"} text-center justify-center rounded-full w-[300px] max-w-[16vw] flex items-center duration-300 hover:bg-typography-primary hover:text-white px-6 py-2.5`}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setCategory(Number(category.id))}
            className={`${categoryId === category.id ? "bg-typography-primary text-white" : "bg-white"} text-center justify-center rounded-full w-[300px] max-w-[16vw] flex items-center duration-300 hover:bg-typography-primary hover:text-white px-6 py-2.5`}
          >
            {category.name}
          </button>
        ))}
      </ul>
    </section>
  )
}
