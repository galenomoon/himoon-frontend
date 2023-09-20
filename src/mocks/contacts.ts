import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { SiShopee } from "react-icons/si"

const contacts = [
  {
    title: "WhatsApp",
    Icon: FaWhatsapp,
    url: `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    title: "Instagram",
    Icon: FaInstagram,
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
  {
    title: "Shopee",
    Icon: SiShopee,
    url: process.env.NEXT_PUBLIC_SHOPEE_URL,
  },
] as any

export default contacts
