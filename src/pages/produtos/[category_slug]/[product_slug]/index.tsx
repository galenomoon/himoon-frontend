import { useContext, useEffect, useState } from "react"

//config
import api_client from "@/config/api_client"

//next
import Image from "next/image"
import { useRouter } from "next/router"

//components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import NextHeader from "@/components/NextHeader"
import Breadcrump from "@/components/Breadcrump"
import { ProductCard } from "@/components/ProductCard"
import ProductImageCarousel from "@/components/ProductImagesCarousel"

//styles
import { Minus, Plus, Star } from "@phosphor-icons/react"
import { FaPlus, FaWhatsapp } from "react-icons/fa"

//interfaces
import { IProduct } from "@/interfaces/product"

//assets
import imageNotFound from "@/assets/image-not-found.jpg"

//utils
import { openWhatsApp } from "@/utils/openWhatsApp"

//contexts
import { CartContext } from "@/contexts/cartContext"

// export async function getServerSideProps(ctx: { query: any }) {
//   const productNotFound = {
//     name: "Produto não encontrado",
//     description: "Produto não encontrado",
//     price: 0,
//     images: [{ url: imageNotFound }],
//   }
//   try {
//     const { product_slug } = ctx.query
//     const endpoint = `websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/products/${product_slug}`
//     const currentProduct = await api_client.get(endpoint).then(({ data }) => data)
//     return {
//       props: { currentProduct: currentProduct || null as unknown as IProduct },
//     }
//   } catch (error) {
//     return {
//       props: { currentProduct: productNotFound },
//     }
//   } finally {
//     return {
//       props: { currentProduct: productNotFound },
//     }
//   }
// }

export default function ProductPage({
  currentProduct,
}: {
  currentProduct: IProduct
}) {
  const { query } = useRouter()
  const { product_slug, category_slug } = query
  const { addCartItem } = useContext(CartContext)
  const [currentImage, setCurrentImage] = useState({ index: 0, url: "" })
  const [product, setProduct] = useState<IProduct>(
    currentProduct as unknown as IProduct,
  )
  const [quantity, setQuantity] = useState<number>(1)
  const [productsByCategory, setProductsByCategory] = useState<IProduct[]>()

  useEffect(() => {
    getProduct()
    getProductsByCategory()
    //eslint-disable-next-line
  }, [product_slug])

  async function getProduct() {
    if (!product_slug) return

    return await api_client
      .get(
        `websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/products/${product_slug}`,
      )
      .then(({ data }) => setProduct(data))
      .catch(console.error)
  }

  async function getProductsByCategory() {
    if (!product_slug) return

    return await api_client
      .get(
        `websites/${process.env.NEXT_PRIVATE_WEBSITE_ID}/products/category/${category_slug}`,
      )
      .then(({ data }) => setProductsByCategory(data))
      .catch(console.error)
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-background-primary text-typography-primary">
      <NextHeader
        image={currentProduct?.images?.[1]?.url || product?.images?.[1]?.url}
        title={`${
          currentProduct?.name || product?.name || "Produto"
        } | Hi, Moon Store 🌙💖`}
        description={
          currentProduct?.description ||
          product?.description ||
          "Descubra uma ampla seleção de produtos de papelaria de alta qualidade, perfeitos para suas necessidades criativas, educacionais e profissionais."
        }
      />
      <Header />
      <section className="flex w-full max-w-screen-xl flex-col px-4 pb-28 sm:px-6 lg:px-8">
        <Breadcrump />
        <div className="mt-8 flex h-fit flex-col rounded-xl bg-white text-typography-black shadow-lg">
          <section className="flex sm:flex-col md:flex-row">
            <figure className="relative flex flex-shrink-0 flex-col items-center justify-center gap-2 p-2 md:w-[400px]">
              <div className="relative flex h-[364px] flex-shrink-0">
                <Image
                  src={
                    product?.images?.[currentImage?.index]?.url || imageNotFound
                  }
                  alt={product?.name || ""}
                  width={400}
                  height={400}
                  objectFit="cover"
                  className="flex-shrink-0 rounded-lg object-cover"
                />
              </div>
              <ProductImageCarousel
                product={product}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
              />
            </figure>
            <aside className="flex flex-col gap-4 p-8">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{product?.name}</h1>
                <div className="flex gap-2">
                  <section className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        size={18}
                        weight="fill"
                        key={index}
                        color="#FBBF24"
                      />
                    ))}
                  </section>
                  <p className="font-satoshi-regular text-typography-black/40">
                    (0 avaliações)
                  </p>
                </div>
                <p className="font-satoshi-black text-2xl text-typography-primary">
                  R$ {Number(product?.price)?.toFixed(2)}
                </p>
                <article className="flex max-h-[100px] border-y-[1px] pb-8 pt-2">
                  <p className="font-satoshi-regular text-typography-black/60">
                    {product?.description}
                  </p>
                </article>
              </div>
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-satoshi-regular text-typography-black/60">
                    Quantidade:
                  </span>{" "}
                  <Counter
                    quantity={quantity}
                    setQuantity={setQuantity}
                    decrement={() => setQuantity(quantity - 1)}
                    increment={() => setQuantity(quantity + 1)}
                  />
                </div>
                <button
                  onClick={() => addCartItem(product as IProduct, quantity)}
                  className="font-satoshi-regular flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary px-6 py-3 text-white duration-200 hover:bg-opacity-90 sm:w-full sm:text-xl md:w-80 md:text-base"
                >
                  <FaPlus size={16} />
                  <p>Adicionar ao carrinho</p>
                </button>
                <button
                  onClick={() => openWhatsApp(product as IProduct, quantity)}
                  className="font-satoshi-regular flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary/20 px-6 py-3 text-typography-primary duration-200 hover:bg-opacity-90 sm:w-full sm:text-xl md:w-80 md:text-base"
                >
                  <FaWhatsapp size={16} />
                  <p>Fazer pedido</p>
                </button>
              </section>
            </aside>
          </section>
        </div>
        {productsByCategory?.length && (
          <section className="mt-8 flex flex-col rounded-2xl bg-white px-4 pb-3 pt-4 shadow-lg">
            <h2 className="text-2xl font-bold text-typography-black">
              Produtos relacionados
            </h2>
            <span className="my-4 mb-2 h-[1.2px] w-full bg-typography-black/5" />
            <div className="scrollbar-hide flex w-full max-w-screen-xl gap-6 py-4 sm:flex-col md:flex-row md:overflow-x-auto">
              {productsByCategory?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        )}
      </section>
      <Footer />
    </main>
  )
}

interface ICounter {
  quantity: number
  increment?: () => void
  decrement?: () => void
  setQuantity?: (quantity: number) => void
  className?: string
}

export function Counter({
  quantity,
  increment,
  decrement,
  setQuantity,
  className,
}: ICounter) {
  return (
    <section
      className={
        "flex w-fit gap-2 rounded-sm border border-typography-black/20 px-2 " +
        className
      }
    >
      <button
        onClick={(e) => quantity > 1 && decrement && decrement()}
        className="flex items-center justify-center px-1"
      >
        <Minus size={12} weight="bold" />
      </button>
      <input
        value={quantity}
        disabled={!setQuantity}
        onChange={({ target }) =>
          setQuantity?.(
            /^[0-9]*$/g.test(target.value) ? Number(target.value) : 1,
          )
        }
        className="font-satoshi-regular flex w-16 items-center justify-center border-x-[1px] border-x-typography-black/20 py-1 text-center text-typography-black/60"
      />
      <button
        onClick={(e) => increment && increment()}
        className="flex items-center justify-center px-1"
      >
        <Plus size={12} weight="bold" />
      </button>
    </section>
  )
}
