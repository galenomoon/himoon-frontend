import React from "react";

export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col items-center gap-2 justify-center w-fit">
      <p className="font-satoshi-light sm:text-4xl md:text-5xl text-center">
        {children}
      </p>
      <div className="h-[2px] w-[40%] bg-typography-primary/80" />
    </article>
  );
}
