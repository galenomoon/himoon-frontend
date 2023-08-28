import React, { useEffect, useState } from 'react'

//config
import api_client from '@/config/api_client'

//styles
import { toast } from 'react-hot-toast'
import { Basket, NotePencil, Trash } from '@phosphor-icons/react'

//components
import Modal from '../Modal'
import Alert from '../Alert'
import CategoryForm from '../CategoryForm'

//interfaces
import { Category } from '@/interfaces/category'

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    return await api_client.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(error => console.log(error))
  }

  async function deleteCategory() {
    if (!selectedCategory) return
    await api_client.delete(`/categories/${selectedCategory.id}`)
      .then(({ data }) => setCategories(data))
      .catch(error => {
        console.error(error)
        toast.error('Erro ao excluir categoria')
      })
      .finally(() => close())
  }

  function openDeleteAlert(category: Category) {
    setSelectedCategory(category)
    setIsAlertOpen(true)
  }

  function openEditModal(category: Category) {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  function close() {
    setIsAlertOpen(false)
    setIsModalOpen(false)
    setSelectedCategory(undefined)
  }

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
                Gerenciar Categorias
              </p>
              <br />
              <button onClick={() => setIsModalOpen(true)} className='bg-blue-800 text-white px-4 py-2 rounded-lg font-satoshi-medium'>
                Adicionar Categoria
              </button>
            </header>
            <section className='overflow-auto w-full'>
              <table className="table-auto w-full text-left font-satoshi-regular h-full text-sm">
                <thead className="h-12 font-satoshi-medium sticky top-0 z-10 bg-white shadow-sm">
                  <tr>
                    <th className='p-4 whitespace-nowrap opacity-40'>#</th>
                    <th className='p-4 whitespace-nowrap'>Nome</th>
                    <th className='p-4 whitespace-nowrap'>Criado em</th>
                    <th className='p-4 whitespace-nowrap'>Atualizado em</th>
                    <th className='p-4 whitespace-nowrap flex justify-end'></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    if (!category.createdAt || !category.updatedAt) return null

                    const createdAt = new Date(category.createdAt)
                    const updatedAt = new Date(category.updatedAt)

                    return (
                      <tr key={index} className="w-full border-y text-sm font-satoshi-normal border-background-gray/20 hover:cursor-pointer duration-200 ease-in-out hover:bg-blue-400/5">
                        <td className='p-4 whitespace-nowrap opacity-40'>{category.id}</td>
                        <td className='p-4 whitespace-nowrap'>{category.name}</td>
                        <td className='p-4 whitespace-nowrap'>{createdAt?.toLocaleString('pt-BR')}</td>
                        <td className='p-4 whitespace-nowrap'>{updatedAt?.toLocaleString('pt-BR')}</td>
                        <td className='p-4 flex gap-2 justify-end'>
                          <button onClick={() => openEditModal(category)} className='flex gap-2 items-center text-blue-800 bg-blue-400/20 border-2 border-blue-800/20 hover:opacity-60 duration-200 rounded-lg p-1 justify-center'>
                            <NotePencil size={28} weight="duotone" />
                            <p className='font-satoshi-medium pr-1'>
                              Editar
                            </p>
                          </button>
                          <button onClick={() => openDeleteAlert(category)} className='flex gap-2 items-center text-red-800 bg-red-400/20 border-2 border-red-800/20 hover:opacity-60 duration-200 rounded-lg p-1 justify-center'>
                            <Trash size={28} weight="duotone" />
                            <p className='font-satoshi-medium pr-1'>
                              Excluir
                            </p>
                          </button>
                          <button onClick={() => openDeleteAlert(category)} className='flex gap-2 items-center text-green-800 bg-green-400/20 border-2 border-green-800/20 hover:opacity-60 duration-200 rounded-lg p-1 justify-center'>
                            <Basket size={28} weight="duotone" />
                            <p className='font-satoshi-medium pr-1'>
                              Produtos
                            </p>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </section>
      </main>
      <Alert
        onConfirm={() => deleteCategory()}
        isOpen={!!selectedCategory && isAlertOpen}
        close={() => close()}
        title={`Excluir categoria "${selectedCategory?.name}"`}
        message='Tem certeza que deseja excluir esta categoria?'
        warning='Todos os produtos desta categoria serão excluídos também.'
      />
      <Modal
        isOpen={isModalOpen}
        close={() => close()}
        title={selectedCategory?.id ? 'Editar categoria' : 'Adicionar categoria'}
      >
        <CategoryForm
          getCategories={getCategories}
          close={() => close()}
          category={selectedCategory || { id: 0, name: '' }}
        />
      </Modal>

    </>
  )
}
