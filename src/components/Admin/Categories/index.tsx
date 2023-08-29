import React, { useEffect, useState } from 'react'

//config
import api_client from '@/config/api_client'

//styles
import { toast } from 'react-hot-toast'

//components
import Modal from '../Modal'
import Alert from '../Alert'
import Button from '../Button'
import CategoryForm from '../CategoryForm'
import CategoriesList from '../CategoriesList'

//interfaces
import { Category } from '@/interfaces/category'

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    setIsLoaded(false)
    return await api_client.get('/categories')
      .then(({ data }) => setCategories(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoaded(true))
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
          <div className="flex flex-col h-[85vh] text-typography-main relative overflow-hidden w-full bg-white shadow-lg rounded-xl pb-2">
            <header className='h-[68px] bg-white w-full flex items-center justify-between p-4'>
              <p className='text-typography-main font-satoshi-semibold text-xl'>
                Gerenciar Categorias
              </p>
              <br />
              <Button onClick={() => setIsModalOpen(true)}>
                Adicionar Categoria
              </Button>
            </header>
            <CategoriesList
              isLoaded={isLoaded}
              categories={categories}
              openEditModal={openEditModal}
              setIsModalOpen={setIsModalOpen}
              openDeleteAlert={openDeleteAlert}
            />
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
