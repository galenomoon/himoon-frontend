import React from "react"
import Image from "next/image"

//assets
import logo from "@/assets/complete_logo.png"

export default function Separator({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="flex w-screen flex-col justify-center bg-background-secondary py-2 text-center text-white">
      <span className="dashed-border h-1" />
      <article className="flex h-full flex-col items-center py-14">
        <h2 className="font-windsor font-bold sm:text-4xl md:text-6xl">
          {title}
        </h2>
        <p className="text-lg">{description}</p>
      </article>
      <span className="dashed-border h-1" />
    </section>
  )
}

export function HeaderSeparator({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <section className="py-y relative flex h-[32vh] w-screen flex-col justify-between overflow-hidden bg-gradient-to-r from-[#C0B4EB] to-[#EBAFFF] text-white">
      <span className="dashed-border z-[1] mt-2 h-1" />
      <div className="flex items-center justify-between md:px-28">
        <article className="flex h-full flex-col py-14 sm:items-center sm:justify-center sm:text-center md:items-start md:justify-start md:text-start">
          <h2 className="font-windsor font-bold sm:text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="sm:text-md sm:w-[90%] md:w-[60%] md:text-sm">
            {description}
          </p>
        </article>
        <Image
          src={logo}
          alt="logo"
          width={1000}
          height={1000}
          className="absolute right-36 z-0 w-[500px] self-center object-cover sm:hidden md:block"
        />
      </div>
      <span className="dashed-border z-[1] mb-2 h-1" />
    </section>
  )
}
