import React, { useEffect, useState } from "react"

//next
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"

//components
import CategoriesBar from "../CategoriesBar"

//styles
import { motion } from "framer-motion"
import { IoClose } from "react-icons/io5"
import { GiHamburgerMenu } from "react-icons/gi"

//config
import api_client from "@/config/api_client"

//assets
import horizontalLogo from "@/assets/horizontal_logo.png"

//mocks
import contacts from "@/mocks/contacts"

//interfaces
import { ICategory } from "@/interfaces/category"

export default function Header({ fixed = false }) {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const isHomePage = pathname === "/"
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    getCategories()
  }, [])

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
  ]

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  }

  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }

  async function getCategories() {
    return await api_client
      .get("/categories?sortBy=name")
      .then(({ data }) => setCategories(data))
      .catch(console.error)
  }

  return (
    <>
      {/* Mobile Header */}
      {fixed ? (
        <div className="md:hidden sm:fixed z-[99] w-screen">
          <CategoriesBar categories={categories} />
        </div>
      ) : null}
      <motion.header
        variants={container}
        initial="hidden"
        animate="visible"
        className="fixed top-12 z-[300] h-[90px] w-full items-center justify-between p-4 sm:flex md:hidden"
      >
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsOpen(!isOpen)}
          className="text-typography-100 z-[101] flex items-center justify-center rounded-full bg-typography-primary p-3 text-2xl text-white"
        >
          {isOpen ? <IoClose size={40} /> : <GiHamburgerMenu />}
        </motion.button>
        <motion.article
          className="fixed left-0 top-0 z-[100] flex flex-col items-center justify-center gap-4 overflow-hidden bg-white text-4xl"
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
                className="absolute bottom-0 flex h-fit w-full items-center justify-between bg-typography-primary px-4 py-12 text-white"
              >
                <motion.p variants={item} className="text-md">
                  Fale conosco:
                </motion.p>
                <motion.div
                  variants={container}
                  className="flex items-center justify-center gap-4"
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
        className={`flex w-screen flex-col items-center justify-center bg-background-primary sm:hidden md:flex ${
          fixed ? (isHomePage ? "fixed" : "sticky") : ""
        } top-0 z-[999]`}
      >
        <section className="flex w-full max-w-[94rem] py-4 md:px-24">
          <nav className="flex w-full items-center justify-between">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.path}
                className="flex w-[142px] items-center justify-center rounded-full py-3 duration-200 hover:bg-typography-primary/20 hover:text-typography-primary"
              >
                <p>{route.name}</p>
              </Link>
            ))}
          </nav>
          <nav className="flex w-full items-center justify-center">
            <Image
              src={horizontalLogo}
              alt="logo"
              width={1000}
              height={1000}
              className="w-[120px]"
            />
          </nav>
          <nav className="flex w-full items-center justify-end gap-6 text-3xl">
            {contacts.map((contact: any, index: number) => (
              <Link
                href={contact.url}
                key={index}
                className="flex h-[30px] w-[30px] items-center justify-center"
              >
                <contact.Icon />
              </Link>
            ))}
          </nav>
        </section>
        <CategoriesBar categories={categories} />
      </header>
    </>
  )
}
