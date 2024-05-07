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
  const absoluteUrl = `https://${url}`
  return (
    <>
      <Card theme={CustomCard} href="#" className="max-w-sm">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {email}
        </h5>
        <p className="font-normal text-gray-500">Author: {author}</p>
        <p className="text-gray-700 dark:text-gray-400">{title}</p>
        <a href={absoluteUrl} className="text-blue-500 underline">
          Visit Blog
        </a>
      </Card>
    </>
  )
}
