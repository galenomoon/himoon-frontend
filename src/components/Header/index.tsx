import React, { useEffect, useState } from "react";

//next
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

//styles
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5";

//config
import api_client from "@/config/api_client";

//assets
import horizontalLogo from "@/assets/horizontal_logo.png";

//mocks
import contacts from "@/mocks/contacts";

//interfaces
import { ICategory } from "@/interfaces/category";

export default function Header({ fixed = false }) {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = pathname === "/";
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const routes = [
    {
      name: "Início",
      path: "/",
    },
    {
      name: "Produtos",
      path: "/#produtos",
    },
    {
      name: "Contato",
      path: "/#contato",
    },
  ];

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  async function getCategories() {
    return await api_client
      .get("/categories?sortBy=name")
      .then(({ data }) => setCategories(data))
      .catch(console.error);
  }

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full top-0 fixed sm:flex z-[300] md:hidden justify-between p-4 h-[90px] items-center"
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-3 text-typography-100 bg-typography-primary text-white flex items-center justify-center rounded-full z-[101]"
        >
          {isOpen ? <IoClose size={40} /> : <GiHamburgerMenu />}
        </motion.button>
        <motion.article
          className="flex flex-col items-center top-0 left-0 fixed bg-white justify-center gap-4 text-4xl z-[100] overflow-hidden"
          initial={{
            width: "0px",
            height: "0px",
            top: "30px",
            left: "30px",
            position: "absolute",
          }}
          animate={{
            width: isOpen ? "100dvw" : "0px",
            height: isOpen ? "100dvh" : "0px",
            top: isOpen ? "0px" : "30px",
            left: isOpen ? "0px" : "30px",
            borderRadius: isOpen ? "0px" : "25%",
          }}
        >
          {isOpen && (
            <>
              <motion.div
                variants={container}
                className="flex flex-col items-center justify-center gap-7"
              >
                {routes.map((route, index) => (
                  <motion.a
                    href={route.path || "#"}
                    variants={item}
                    key={index}
                    className="text-start"
                  >
                    {route.name}
                  </motion.a>
                ))}
              </motion.div>
              <motion.div
                variants={container}
                className="flex w-full h-fit absolute bottom-0 text-white bg-typography-primary items-center justify-between py-12 px-4"
              >
                <motion.p variants={item} className="text-md">
                  Fale conosco:
                </motion.p>
                <motion.div
                  variants={container}
                  className="flex items-center gap-4 justify-center"
                >
                  {contacts.map((contact: any, index: number) => (
                    <motion.a
                      href={contact.url || "#"}
                      key={index}
                      target="_blank"
                    >
                      <contact.Icon size={32} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.article>
      </motion.header>

      {/* Desktop Header */}
      <header
        className={`flex flex-col bg-background-primary items-center justify-center w-screen md:flex sm:hidden ${
          fixed ? (isHomePage ? "fixed" : "sticky") : ""
        } z-[999] top-0`}
      >
        <section className="flex max-w-[94rem] w-full md:px-24 py-4">
          <nav className="flex items-center justify-between w-full">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.path}
                className="flex items-center w-[142px] justify-center py-3 hover:text-typography-primary hover:bg-typography-primary/20 duration-200 rounded-full"
              >
                <p>{route.name}</p>
              </Link>
            ))}
          </nav>
          <nav className="flex items-center justify-center w-full">
            <Image
              src={horizontalLogo}
              alt="logo"
              width={1000}
              height={1000}
              className="w-[120px]"
            />
          </nav>
          <nav className="flex items-center text-3xl justify-end gap-6 w-full">
            {contacts.map((contact: any, index: number) => (
              <Link
                href={contact.url}
                key={index}
                className="h-[30px] w-[30px] flex justify-center items-center"
              >
                <contact.Icon />
              </Link>
            ))}
          </nav>
        </section>
        {categories.length > 0 && (
          <div className="flex relative items-center justify-center w-full animate-fade-in">
            <div className="flex md:px-24 overflow-scroll scrollbar-hide bg-typography-primary items-center justify-center w-full">
              <button className="absolute bg-gradient-to-r text-white from-typography-primary left-0 flex items-center justify-start px-6 h-full w-38">
                <IoChevronBack size={32} />
              </button>
              <nav className="flex items-center w-full">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/produtos/${category.slug}`}
                    className="w-fit flex items-center justify-center py-2 px-8 m-2 rounded-full hover:bg-white hover:text-typography-primary text-white whitespace-nowrap uppercase duration-200"
                  >
                    <p>{category.name}</p>
                  </Link>
                ))}
              </nav>
              <button className="absolute bg-gradient-to-l text-white from-typography-primary right-0 flex items-center justify-end px-6 h-full w-38">
                <IoChevronForward size={32} />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
