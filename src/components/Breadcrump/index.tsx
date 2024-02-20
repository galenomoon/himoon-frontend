import React from "react"

//next
import Link from "next/link"
import { useRouter } from "next/router"

//styles
import { CaretRight } from "@phosphor-icons/react"

export default function Breadcrump() {
  const { query } = useRouter()

  return (
    <section className="font-satoshi-regular flex w-full flex-wrap items-center border-b-[2px] border-black/5 py-7 sm:mt-12 sm:gap-x-2 md:mt-0 md:gap-x-6">
      <Link href="/">Início</Link>
      <CaretRight size={18} weight="bold" />
      <Link href="/produtos" className="">
        Produtos
      </Link>
      {Object.keys(query).map((key, index) => {
        const path = Object.values(query)
        const route = path.slice(0, index + 1).join("/")
        const isCurrent = index === path.length - 1
        return (
          <React.Fragment key={index}>
            <CaretRight size={18} weight="bold" className="flex-shrink-0" />
            <Link
              href={"/produtos/" + route}
              className={`${
                isCurrent ? "text-typography-black" : "underline"
              } whitespace-nowrap capitalize`}
            >
              {`${query?.[key]}`.replace(/-/g, " ")}
            </Link>
          </React.Fragment>
        )
      })}
    </section>
  )
}
