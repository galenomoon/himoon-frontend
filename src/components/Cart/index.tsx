import React, { useContext } from "react"

//contexts
import { CartContext } from "@/contexts/cartContext"

//interfaces
import { ICartItem } from "@/interfaces/cartItem"

//components
import { Counter } from "@/pages/produtos/[category_slug]/[product_slug]"

//icons
import { PiXBold } from "react-icons/pi"
import { BiSolidTrash } from "react-icons/bi"

//next
import Link from "next/link"
import Image from "next/image"

//assets
import emptyCart from "@/assets/empty-cart.png"

export default function Cart() {
  const { cartItems, isCartOpened, closeCart, totalCartQuantity, totalPrice } =
    useContext(CartContext)

  function sendCartToWhatsApp() {
    let total = 0

    const message = cartItems.map((cartItem) => {
      total += Number(cartItem.product.price) * cartItem.quantity
      return `
    *${cartItem.product.name}*
    Qtd: ${cartItem.quantity}
    Preço: R$ ${Number(cartItem.product.price).toFixed(2)}
    ____________________
    `
    })

    const formattedMessage = `
    *🛒💗 Seu Carrinho 🛒💗:*
    
    ${message.join("")}
    *🎀 Total: R$ ${totalPrice} 🎀*
      `

    const encodedMessage = encodeURIComponent(formattedMessage)
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${encodedMessage}`

    window.open(link, "_blank")
  }

  return !isCartOpened ? null : (
    <section className="fixed right-0 top-0 z-[1000] h-screen bg-white shadow-md sm:w-screen md:w-[500px]">
      <div className="relative flex h-full flex-col justify-between">
        <header className="flex items-center justify-between border-b py-6 sm:px-4 md:px-8">
          <h1 className="text-2xl font-bold">Carrinho ({totalCartQuantity})</h1>
          <button className="flex h-10 w-10 items-center justify-center font-bold">
            <PiXBold size={24} onClick={closeCart} />
          </button>
        </header>

        {cartItems.length > 0 ? (
          <section className="flex h-full w-full flex-col items-center overflow-auto">
            {cartItems.map((cartItem, index) => (
              <CartItem key={index} {...cartItem} />
            ))}
          </section>
        ) : (
          <section className="flex h-full flex-col items-center justify-center text-4xl">
            <Image
              src={emptyCart}
              alt="Carrinho vazio"
              width={364}
              height={364}
            />
            <h1>Seu carrinho está vazio</h1>
            <p className="font-satoshi-regular text-xl text-typography-black/60">
              Adicione produtos para continuar
            </p>
            <Link
              href="/produtos"
              passHref
              onClick={closeCart}
              className="font-satoshi-regular mt-6 flex w-[300px] flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary px-6 py-2 text-white duration-200 hover:bg-opacity-90 sm:text-xl md:text-lg"
            >
              Ver produtos
            </Link>
          </section>
        )}
        {cartItems.length > 0 && (
          <footer className="flex w-full items-center justify-between border-t bg-white pt-8 shadow-md sm:px-4 sm:pb-10 md:px-8 md:pb-8">
            <p className="sm:text-xl md:text-2xl">
              Total:{" "}
              <span className="font-satoshi-black whitespace-nowrap text-typography-black">
                R$ {totalPrice}
              </span>
            </p>
            <button
              onClick={sendCartToWhatsApp}
              className="font-satoshi-regular flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary px-6 py-2 text-base text-white duration-200 hover:bg-opacity-90"
            >
              Finalizar compra
            </button>
          </footer>
        )}
      </div>
    </section>
  )
}

export function CartItem(cartItem: ICartItem) {
  const { removeCartItem, incrementCartItem, decrementCartItem, closeCart } =
    useContext(CartContext)

  const currentValue = Number(cartItem.product.price) * cartItem.quantity
  return (
    <section className="flex w-full items-center justify-between gap-8 bg-background-light py-6 duration-300 hover:bg-background-light/60 sm:px-4 md:px-8">
      <section className="flex w-full items-center sm:gap-3 md:gap-6">
        <Image
          alt={cartItem.product.name}
          src={cartItem.product.images[0].url}
          width={64}
          height={64}
          className="!h-16 !w-16 flex-shrink-0 rounded-lg object-cover"
        />
        <section className="flex w-full flex-col gap-2">
          <Link
            onClick={closeCart}
            href={`/produtos/${cartItem!.product!.category!.slug}/${
              cartItem.product.slug
            }`}
            passHref
            className="line-clamp-2 w-full hover:underline"
          >
            {cartItem.product.name}
          </Link>
          <article className="flex items-center justify-between gap-4">
            <span className="font-satoshi-black whitespace-nowrap text-lg text-typography-black">
              R$ {Number(currentValue).toFixed(2).replace(".", ",")}
            </span>
            <Counter
              decrement={() => decrementCartItem(cartItem.product)}
              increment={() => incrementCartItem(cartItem.product)}
              quantity={cartItem.quantity}
              className="h-7"
            />
          </article>
        </section>
      </section>
      <div className="flex items-center justify-center">
        <button
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white duration-300 hover:opacity-80"
          onClick={() => removeCartItem(cartItem.product.id)}
        >
          <BiSolidTrash size={24} />
        </button>
      </div>
    </section>
  )
}
