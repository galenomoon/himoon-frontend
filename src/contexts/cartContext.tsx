"use client"
import React, { createContext, ReactNode, useEffect, useState } from "react"

//interfaces
import { IProduct } from "@/interfaces/product"
import { ICartItem } from "@/interfaces/cartItem"

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

  useEffect(() => {
    saveOnLocalStorage()
  }, [cartItems])

  async function getCartItems() {
    return
  }

  async function removeCartItem(item_id: number | undefined) {
    setCartItems((prev) =>
      prev.filter((cartItem) => cartItem.product.id !== item_id),
    )
    return
  }

  async function cleanCart() {
    setCartItems([])
    return
  }

  function addCartItem(item: IProduct, quantity = 1) {
    const itemAlreadyInCart = itemIsInCart(item.id as number)

    if (itemAlreadyInCart) {
      incrementCartItem(item, quantity)
      return
    }

    setCartItems((prev) => [
      ...prev,
      {
        product: item,
        quantity,
        total: Number(item.price),
      },
    ])
  }

  async function incrementCartItem(item: IProduct, quantity = 1) {
    setCartItems((prev) =>
      prev.map((cartItem) => {
        if (cartItem.product.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
            total: (cartItem.quantity + quantity) * Number(item.price),
          }
        }
        return cartItem
      }),
    )
  }

  async function decrementCartItem(item: IProduct) {
    setCartItems((prev) =>
      prev.map((cartItem) => {
        if (cartItem.product.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            total: (cartItem.quantity - 1) * Number(cartItem.product.price),
          }
        }
        return cartItem
      }),
    )
  }

  function saveOnLocalStorage() {
    //save on local storage
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
