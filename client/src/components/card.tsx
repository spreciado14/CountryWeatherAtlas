'use client'
import { useState } from 'react'

import {
  Button,
  Card,
  CustomFlowbiteTheme,
  Label,
  TextInput,
} from 'flowbite-react'
import { FaGears } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'

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

const CustomButtonGroup: CustomFlowbiteTheme['buttonGroup'] = {
  base: 'flex justify-center',
  position: {
    none: '',
    start: 'rounded-r-none focus:ring-2',
    middle: 'rounded-none border-l-0 pl-0 focus:ring-2',
    end: 'rounded-l-none border-l-0 pl-0 focus:ring-2',
  },
}

export function CardComponent({
  author,
  email,
  url,
  title,
  onDelete,
  id,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ email, author, title })
  const absoluteUrl = `https://${url}`

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    onEdit(id, editData)
  }

  const handleChange = event => {
    setEditData({ ...editData, [event.target.name]: event.target.value })
  }
  return (
    <>
      <Card theme={CustomCard} href="#" className="max-w-sm">
        <Button.Group theme={CustomButtonGroup}>
          <Button color="gray" onClick={isEditing ? handleSave : handleEdit}>
            <FaGears className="mr-3 h-4 w-4" />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          <Button onClick={() => onDelete(id)} color="gray">
            <MdDelete className="mr-3 h-4 w-4" />
            Delete
          </Button>
        </Button.Group>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {email}
        </h5>
        <p className="font-normal text-gray-500">
          Author:
          {isEditing ? (
            <input
              type="text"
              name="author"
              value={editData.author}
              onChange={handleChange}
            />
          ) : (
            author
          )}
        </p>
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
            />
          ) : (
            title
          )}
        </h5>
        <p className="text-gray-700 dark:text-gray-400">
          {isEditing ? (
            <input
              type="text"
              name="url"
              value={editData.url}
              onChange={handleChange}
            />
          ) : (
            <a href={`https://${url}`} className="text-blue-500 underline">
              {`https://${url}`}
            </a>
          )}
        </p>
      </Card>
    </>
  )
}
