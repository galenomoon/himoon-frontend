import React from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"

interface SearchBarProps {
  setText: (text: string) => void
  text: string
}

export default function SearchBar({
  setText = () => {},
  text,
}: SearchBarProps) {
  return (
    <div className="flex w-full items-center gap-4 overflow-hidden rounded-xl border border-black/10 bg-white px-5 py-2">
      <MagnifyingGlass size={22} color="black" className="opacity-60" />
      <input
        className="font-satoshi-regular w-full bg-transparent text-typography-black focus:outline-none"
        onChange={(e) => setText(e.target.value)}
        placeholder="Pesquisar produto..."
        value={text}
      />
    </div>
  )
}
