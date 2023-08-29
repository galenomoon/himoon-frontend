import React from 'react'

//next
import Image from 'next/image'

//components
import Button from '../Button'

//assets
import empty_state from '@/assets/thinking.svg'

interface EmptyStateProps {
  title: string
  description?: string
  onClick?: () => void
  buttonLabel?: string
}

export default function EmptyState({ title, description, onClick, buttonLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <figure className="h-[300px] w-full overflow-hidden flex items-center justify-center">
          <Image
            alt='empty'
            width={400}
            src={empty_state}
            className='flex-shrink-0 h-[360px] mt-10 object-cover'
          />
        </figure>
        <h1 className="text-3xl font-satoshi-medium">{title}</h1>
        {description && <p className="opacity-40 text-center">{description}</p>}
      </div>
      {onClick &&
        <Button
          onClick={onClick}
          className='w-64'
        >
          {buttonLabel || 'Criar o primeiro'}
        </Button>
      }
    </div>
  )
}