import React from "react"

export default function SectionTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="flex w-fit flex-col items-center justify-center gap-2">
      <p className="font-satoshi-light text-center sm:text-4xl md:text-5xl">
        {children}
      </p>
      <div className="h-[2px] w-[40%] bg-typography-primary/80" />
    </article>
  )
}
