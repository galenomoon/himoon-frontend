import React, { useState } from 'react'

//next
import Image from 'next/image'
import Link from 'next/link'

//styles
import { motion } from "framer-motion"
import { IoClose } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'

//assets
import horizontalLogo from '@/assets/horizontal_logo.png'

//mocks
import contacts from '@/mocks/contacts'

export default function Header() {

  const routes = [
    {
      name: 'Início',
      path: '/'
    },
    {
      name: 'Produtos',
      path: '#produtos'
    },
    {
      name: 'Contato',
      path: '#contato'
    }
  ]

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  };

  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };


  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        variants={container}
        initial="hidden"
        animate="visible"
        className='w-full top-0 fixed sm:flex z-[300] md:hidden justify-between p-4 h-[90px] items-center'
      >
        <motion.button
          whileTap={{ scale: .8 }}
          onClick={() => setIsOpen(!isOpen)}
          className='text-2xl p-3 text-typography-100 bg-typography-primary text-white flex items-center justify-center rounded-full z-[101]'
        >
          {isOpen ? <IoClose size={40} /> : <GiHamburgerMenu />}
        </motion.button>
        <motion.article
          className='flex flex-col items-center top-0 left-0 fixed bg-white justify-center gap-4 text-4xl z-[100] overflow-hidden'
          initial={{ width: '0px', height: '0px', top: '30px', left: '30px', position: 'absolute' }}
          animate={{
            width: isOpen ? '100dvw' : '0px',
            height: isOpen ? '100dvh' : '0px',
            top: isOpen ? '0px' : '30px',
            left: isOpen ? '0px' : '30px',
            borderRadius: isOpen ? '0px' : '25%',
          }}
        >
          {isOpen &&
            <>
              <motion.div variants={container} className='flex flex-col items-center justify-center gap-7'>
                {routes.map((route, index) =>
                  <motion.a href={route.path || '#'} variants={item} key={index} className='text-start'>
                    {route.name}
                  </motion.a>
                )}
              </motion.div>
              <motion.div variants={container} className='flex w-full h-fit absolute bottom-0 text-white bg-typography-primary items-center justify-between py-12 px-4'>
                <motion.p variants={item} className='text-md'>
                  Fale conosco:
                </motion.p>
                <motion.div variants={container} className='flex items-center gap-4 justify-center'>
                  {contacts.map((contact: any, index: number) =>
                    <motion.a href={contact.url || '#'} key={index} target='_blank'>
                      <contact.Icon size={32} />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </>
          }
        </motion.article>
      </motion.header>

      {/* Desktop Header */}
      <header className='flex bg-background-primary items-center justify-center w-screen py-6 md:flex sm:hidden  md:px-24 fixed top-0'>
        <section className='flex max-w-[94rem] w-full'>
          <nav className='flex items-center justify-between w-full'>
            {routes.map((route, index) =>
              <Link
                key={index}
                href={route.path}
                className='flex items-center w-[142px] justify-center py-3 hover:text-typography-primary hover:bg-typography-primary/20 duration-200 rounded-full'
              >
                <p>{route.name}</p>
              </Link>
            )}
          </nav>
          <nav className='flex items-center justify-center w-full'>
            <Image
              src={horizontalLogo}
              alt="logo"
              width={1000}
              height={1000}
              className='w-[120px]'
            />
          </nav>
          <nav className='flex items-center text-3xl justify-end gap-6 w-full'>
            {contacts.map((contact: any, index: number) =>
              <Link href={contact.url} key={index} className='h-[30px] w-[30px] flex justify-center items-center'>
                <contact.Icon />
              </Link>
            )}
          </nav>
        </section>
      </header>
    </>
  )
}
