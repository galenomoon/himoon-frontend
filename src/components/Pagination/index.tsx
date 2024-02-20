import React from "react"

//styles
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

interface IPaginationProps {
  totalPages: number
  currentPage: number
  nextPage: (page: number) => void
  previousPage: (page: number) => void
}

export default function Pagination({
  totalPages = 1,
  currentPage = 1,
  nextPage,
  previousPage,
}: IPaginationProps) {
  return (
    <section className="flex !w-[220px] items-center justify-center gap-1 rounded-full bg-background-light p-2">
      <p className="flex w-[70px] items-center justify-center gap-1 whitespace-nowrap">
        <span className="font-satoshi-bold">
          {currentPage < 10 ? `0${currentPage}` : currentPage}
        </span>
        <span className="font-satoshi-light"> de </span>
        <span className="font-satoshi-medium opacity-80">
          {totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>
      </p>
      <aside className="flex gap-2">
        <button
          onClick={() => previousPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-6 w-6 items-center justify-center rounded-full duration-200 hover:bg-black/10 disabled:opacity-20"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          onClick={() => nextPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-6 w-6 items-center justify-center rounded-full duration-200 hover:bg-black/10 disabled:opacity-20"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </aside>
    </section>
  )
}
