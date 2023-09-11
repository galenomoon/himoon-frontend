//components
import Menu from "@/components/Admin/Menu";
import Welcome from "@/components/Admin/Welcome";
import NextHeader from "@/components/NextHeader";
import Products from "@/components/Admin/Products";
import Categories from "@/components/Admin/Categories";

//next
import { useRouter } from "next/router";

//styles
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const { query } = useRouter();
  const currentOption = query.option || "welcome";

  return (
    <main className="relative flex min-h-screen w-fit font-satoshi-regular sm:bg-white md:bg-[#eee]">
      <NextHeader title="Administração - Hi, Moon Store | Dashboard" />
      <Menu />
      <section className="flex flex-col px-12 pt-12 w-[calc(100vw-324px)]">
        {currentOption === "welcome" && <Welcome />}
        {currentOption === "categorias" && <Categories />}
        {currentOption === "produtos" && <Products />}
        {(currentOption === "redes-sociais" ||
          currentOption === "estatisticas") && (
          <section className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-5xl font-satoshi-medium text-gray-500 animate-slide-in">
              👨🏽‍💻 Em desenvolvimento...
            </p>
          </section>
        )}
      </section>
      <Toaster position="top-right" />
    </main>
  );
}
