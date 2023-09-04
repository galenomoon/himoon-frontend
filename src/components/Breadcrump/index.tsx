import React from "react";

//next
import Link from "next/link";

//styles
import { CaretRight } from "@phosphor-icons/react";

//interfaces
import { IProduct } from "@/interfaces/product";

export default function Breadcrump({ product }: { product?: IProduct }) {

  return (
    <section className="flex gap-6 border-b-[2px] py-7 border-black/5 underline items-center">
      <Link href="/">Início</Link>
      <CaretRight size={18} weight="bold" />
      <Link href="/produtos" className="">
        Produtos
      </Link>
      {product ? (
        <>
          <CaretRight size={18} weight="bold" />
          <p className="font-satoshi-bold">
            {product.name}
          </p>
        </>
      ) : null}
    </section>
  );
}
