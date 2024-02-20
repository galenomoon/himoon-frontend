import React from "react"

//interfaces
import { ICategory } from "@/interfaces/category"

interface CategoryListProps {
  categoryId: number | null
  categories: ICategory[]
  setCategory: React.Dispatch<React.SetStateAction<number | null>>
}

export default function CategoriesList({
  categoryId,
  categories,
  setCategory = () => {},
}: CategoryListProps) {
  return (
    <section className="w- flex h-full flex-col rounded-xl bg-background-light px-2 py-9">
      <h2 className="text-2xl font-bold ">Categorias:</h2>
      <span className="my-4 h-[2px] w-full bg-black/5" />
      <ul className="flex flex-col items-center justify-center gap-3">
        <button
          onClick={() => setCategory(null)}
          className={`${
            !categoryId ? "bg-typography-primary text-white" : "bg-white"
          } flex w-[300px] max-w-[16vw] items-center justify-center rounded-full px-6 py-2.5 text-center duration-300 hover:bg-typography-primary hover:text-white`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCategory(Number(category.id))}
            className={`${
              categoryId === category.id
                ? "bg-typography-primary text-white"
                : "bg-white"
            } flex w-[300px] max-w-[16vw] items-center justify-center rounded-full px-6 py-2.5 text-center duration-300 hover:bg-typography-primary hover:text-white`}
          >
            {category.name}
          </button>
        ))}
      </ul>
    </section>
  )
}
