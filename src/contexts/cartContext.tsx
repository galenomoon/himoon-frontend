"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react"

//interfaces
import { IProduct } from "@/interfaces/product"
import { ICartItem } from "@/interfaces/cartItem"

//helpers
import { parseCookies, setCookie, destroyCookie } from "nookies"

interface CartContextInterface {
  cartItems: ICartItem[]
  removeCartItem: (item_id: number | undefined) => void
  cleanCart: () => Promise<void>
  addCartItem: (item: IProduct, quantity?: number) => void
  incrementCartItem: (item: IProduct, quantity?: number) => void
  decrementCartItem: (item: IProduct) => void
  isCartOpened?: boolean
  totalCartQuantity: number
  totalPrice: number
  openCart?: () => void
  closeCart?: () => void
}

export const CartContext = createContext<CartContextInterface>({
  cartItems: [],
  removeCartItem: () => {},
  cleanCart: () => Promise.resolve(),
  addCartItem: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  isCartOpened: false,
  totalCartQuantity: 0,
  totalPrice: 0,
  openCart: () => {},
  closeCart: () => {},
})

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isCartOpened, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  useEffect(() => {
    getCartItems()
  }, [])

  async function getCartItems() {
    const { cartItems } = parseCookies()
    if (cartItems) {
      setCartItems(JSON.parse(cartItems))
    }
  }

  async function removeCartItem(item_id: number | undefined) {
    const cart = cartItems.filter((cartItem) => cartItem.product.id !== item_id)
    setCartItems(cart)
    saveOnCookie(cart)
  }

  async function cleanCart() {
    setCartItems([])
    saveOnCookie([])
  }

  function addCartItem(item: IProduct, quantity = 1) {
    const itemAlreadyInCart = itemIsInCart(item.id as number)

    if (itemAlreadyInCart) {
      incrementCartItem(item, quantity)
      return
    }

    const newItem = {
      product: item,
      quantity,
      total: Number(item.price) * quantity,
    }

    const currentCart = [...cartItems, newItem]
    setCartItems(currentCart)
    saveOnCookie(currentCart)
  }

  async function incrementCartItem(item: IProduct, quantity = 1) {
    const cart = cartItems.map((cartItem) => {
      if (cartItem.product.id === item.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + quantity,
          total:
            (cartItem.quantity + quantity) * Number(cartItem.product.price),
        }
      }
      return cartItem
    })
    setCartItems(cart)
    saveOnCookie(cart)
  }

  async function decrementCartItem(item: IProduct) {
    const cart = cartItems.map((cartItem) => {
      if (cartItem.product.id === item.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          total: (cartItem.quantity - 1) * Number(cartItem.product.price),
        }
      }
      return cartItem
    })
    const filteredCart = cart.filter((cartItem) => cartItem.quantity > 0)
    setCartItems(filteredCart)
    saveOnCookie(filteredCart)
  }

  function saveOnCookie(cart: ICartItem[] = cartItems) {
    console.log("Saving on cookie", JSON.stringify(cart))
    setCookie(null, "cartItems", JSON.stringify(cart), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  }

  function itemIsInCart(item_id: number) {
    return cartItems.find(
      (cartItem) => Number(cartItem.product.id) === Number(item_id),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        removeCartItem,
        cleanCart,
        addCartItem,
        incrementCartItem,
        decrementCartItem,
        isCartOpened,
        totalPrice: cartItems
          .reduce(
            (acc, cartItem) => acc + cartItem.total * cartItem.quantity,
            0,
          )
          .toFixed(2) as unknown as number,

        totalCartQuantity: cartItems.reduce(
          (acc, cartItem) => acc + cartItem.quantity,
          0,
        ),
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
