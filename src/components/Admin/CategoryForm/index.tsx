import React from 'react'

//interfaces
import { Category } from '@/interfaces/category'

interface CategoryFormProps {
  category: Category,
  close: () => void,
}

export default function CategoryForm({ category, close }: CategoryFormProps) {
  const [name, setName] = React.useState<string>(category.name)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <label className='flex flex-col gap-1'>
        <span className='text-typography-main font-satoshi-medium'>
          Nome:
        </span>
        <input
          type="text"
          value={name}
          defaultValue={category.name}
          placeholder='Nome da categoria'
          onChange={event => setName(event.target.value)}
          className='border border-background-gray/20 rounded-lg px-4 py-2'
        />
      </label>
      <div className='flex  gap-2'>
        <button className='bg-blue-800 hover:opacity-80 text-white w-full px-4 py-2 rounded-lg font-satoshi-medium'>
          Salvar
        </button>
        <button onClick={close} type='button' className='bg-gray-200 hover:opacity-80 w-full text-typography-main px-4 py-2 rounded-lg font-satoshi-medium'>
          Cancelar
        </button>
      </div>
    </form>
  )
}
