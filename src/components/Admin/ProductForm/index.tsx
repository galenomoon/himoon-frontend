import React from 'react'

//interfaces
import { IProduct } from '@/interfaces/product'
import { ICategory } from '@/interfaces/category'

//config
import api_client from '@/config/api_client'

//styles
import { toast } from 'react-hot-toast'
import { Spinner } from '@phosphor-icons/react'

interface ProductFormProps {
  product: IProduct,
  close: () => void,
  getAll: () => void
  categories: ICategory[]
}

export default function ProductForm({ categories, product: productByProp, close, getAll }: ProductFormProps) {
  const [product, setProduct] = React.useState<IProduct>({...productByProp, images: []})
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const endpoint = product.id ? `/products/${product.id}` : '/products'
    const method = product.id ? 'put' : 'post'
    const payload = {
      ...product,
      price: Number(String(product.price).replace(/\D/g, ''))/100,
    }
    
    if (!payload.name) return toast.error('Preencha o nome do produto')
    if (!payload.description) return toast.error('Preencha a descrição do produto')
    if (!payload.price) return toast.error('Preencha o preço do produto')
    if (!payload.categoryId) return toast.error('Selecione uma categoria')

    setIsLoaded(false)


    await api_client[method](endpoint, payload)
      .then(() => {
        getAll()
        toast.success('Produto salvo com sucesso!')
        close()
      })
      .catch(error => {
        toast.error('Erro ao salvar produto')
        console.error(error)
      })
      .finally(() => setIsLoaded(true))
  }

  function currencyFormat(value: string) {
    const number = Number(value.replace(/\D/g, ''))
    return `R$ ${(number / 100).toFixed(2).replace('.', ',')}`
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <label className='flex flex-col gap-1'>
        <span className='text-typography-main font-satoshi-medium'>
          Nome:
        </span>
        <input
          type="text"
          required
          value={product.name || ''}
          placeholder='Nome do produto'
          onChange={e => setProduct(product => ({ ...product, name: e.target.value }))}
          className='border border-background-gray/20 rounded-lg px-4 py-2'
        />
      </label>
      <label className='flex flex-col gap-1'>
        <span className='text-typography-main font-satoshi-medium'>
          Descrição:
        </span>
        <textarea
          value={product.description}
          rows={4}
          required
          placeholder='Descrição do produto'
          onChange={e => setProduct(product => ({ ...product, description: e.target.value }))}
          className='border border-background-gray/20 rounded-lg px-4 py-2'
        />
      </label>
      <label className='flex flex-col gap-1'>
        <span className='text-typography-main font-satoshi-medium'>
          Preço:
        </span>
        <input
          type="text"
          required
          value={product.price ? currencyFormat(String(product.price)) : currencyFormat('')}
          placeholder='Preço do produto'
          onChange={e => setProduct(product => ({ ...product, price: currencyFormat(e.target.value) }))}
          className='border border-background-gray/20 rounded-lg px-4 py-2'
        />
      </label>
      <label className='flex flex-col gap-1'>
        <span className='text-typography-main font-satoshi-medium'>
          Categoria:
        </span>
        <select
          required
          value={product.categoryId || ''}
          onChange={e => setProduct(product => ({ ...product, categoryId: Number(e.target.value) }))}
          className='border border-background-gray/20 bg-white rounded-lg px-4 py-2'
        >
          <option value={undefined}>Selecione uma categoria</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <div className='flex  gap-2'>
        <button className='bg-blue-800 flex items-center justify-center hover:opacity-80 text-white w-full px-4 h-12 rounded-lg font-satoshi-medium'>
          {isLoaded ? "Salvar" : <Spinner size={32} className='animate-spin' />}
        </button>
        <button onClick={close} type='button' className='bg-gray-200 hover:opacity-80 w-full text-typography-main px-4 py-2 rounded-lg font-satoshi-medium'>
          Cancelar
        </button>
      </div>
    </form>
  )
}
