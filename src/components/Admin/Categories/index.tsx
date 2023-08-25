import React from 'react'

//styles
import { NotePencil, Trash } from '@phosphor-icons/react'

//components
import Alert from '../Alert'

//interfaces
import { Category } from '@/interfaces/category'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>()

  const categories = [
    { id: 1, name: 'Cadernos', createdAt: '10/10/2021', updatedAt: '10/10/2021' },
  ]

  return (
    <>
      <main className='flex flex-col h-full gap-6'>
        <h1 className='text-3xl font-satoshi-medium'>
          Categorias
        </h1>
        <section className='flex flex-col gap-6 h-full'>
          <div className="flex flex-col h-full text-typography-main relative overflow-hidden w-full bg-white shadow-lg rounded-xl pb-2">
            <header className='h-[68px] bg-white w-full flex items-center justify-between p-4'>
              <p className='text-typography-main font-satoshi-semibold text-xl'>
                Gerenicar Categorias
              </p>
              <br />
              <button className='bg-blue-800 text-white px-4 py-2 rounded-lg font-satoshi-medium'>
                Adicionar Categoria
              </button>
            </header>
            <section className='overflow-auto w-full'>
              <table className="table-auto w-full text-left font-satoshi-regular h-full text-sm">
                <thead className="h-12 font-satoshi-medium sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    <th className='p-4 whitespace-nowrap'>Nome</th>
                    <th className='p-4 whitespace-nowrap'>Criado em</th>
                    <th className='p-4 whitespace-nowrap'>Atualizado em</th>
                    <th className='p-4 whitespace-nowrap flex justify-center'>#</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index} className="w-full border-y text-sm font-satoshi-normal border-background-gray/20 hover:cursor-pointer duration-200 ease-in-out hover:bg-blue-400/5">
                      <td className='p-4 whitespace-nowrap'>{category.name}</td>
                      <td className='p-4 whitespace-nowrap'>{category.createdAt}</td>
                      <td className='p-4 whitespace-nowrap'>{category.updatedAt}</td>
                      <td className='p-4 flex gap-2 justify-center'>
                        <button className='flex gap-2 items-center text-blue-800 bg-blue-400/20 border-2 border-blue-800/20 hover:opacity-60 duration-200 rounded-lg p-1 justify-center'>
                          <NotePencil size={28} weight="duotone" />
                        </button>
                        <button onClick={() => setSelectedCategory(category)} className='flex gap-2 items-center text-red-800 bg-red-400/20 border-2 border-red-800/20 hover:opacity-60 duration-200 rounded-lg p-1 justify-center'>
                          <Trash size={28} weight="duotone" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </section>
      </main>
      <Alert
        onConfirm={() => { }}
        isOpen={!!selectedCategory}
        close={() => setSelectedCategory(undefined)}
        title={`Excluir categoria "${selectedCategory?.name}"`}
        message='Tem certeza que deseja excluir esta categoria?'
      />
    </>
  )
}
