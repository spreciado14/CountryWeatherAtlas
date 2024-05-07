'use client'

import { Card, CustomFlowbiteTheme } from 'flowbite-react'

const CustomCard: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'flex rounded-lg border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-center gap-5 p-5',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col md:max-w-xl md:flex-row',
    },
    href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
  },
  img: {
    base: '',
    horizontal: {
      off: 'rounded-t-lg',
      on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
    },
  },
}

export function CardComponent({ author, email, url, title }) {
  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{author}deafeafea</h2>
          <p className="text-sm text-gray-500">{email}safde</p>
        </div>
      </div>
      <a
        href={url}
        className="text-md text-blue-500 hover:underline block mt-2">
        {url}link
      </a>
      <h3 className="mt-2 text-md font-semibold text-gray-900">{title}title</h3>
    </div>
  )
}
