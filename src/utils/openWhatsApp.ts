import { IProduct } from "@/interfaces/product"

export function openWhatsApp(product: IProduct, quantity?: number) {
  const message = quantity
    ? `Olá, gostaria de ${quantity} unidade(s) do produto ${product.name}`
    : `Olá, gostaria de saber mais sobre o produto ${product.name}`
  const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${message}`
  return window.open(link, "_blank")
}
