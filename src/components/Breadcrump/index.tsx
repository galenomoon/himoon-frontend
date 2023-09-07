import React from "react";

//next
import Link from "next/link";
import { useRouter } from "next/router";

//styles
import { CaretRight } from "@phosphor-icons/react";

export default function Breadcrump() {
  const { query } = useRouter();

  return (
    <section className="flex gap-6 border-b-[2px] py-7 border-black/5 underline items-center">
      <Link href="/">Início</Link>
      <CaretRight size={18} weight="bold" />
      <Link href="/produtos" className="">
        Produtos
      </Link>
      {Object.keys(query).map((key, index) => {
        const path = Object.values(query);
        const route = path.slice(0, index + 1).join("/");
        return (
          <React.Fragment key={index}>
            <CaretRight size={18} weight="bold" />
            <Link href={"/produtos/" + route} className="capitalize">
              {`${query?.[key]}`.replace(/-/g, " ")}
            </Link>
          </React.Fragment>
        );
      })}
    </section>
  );
}