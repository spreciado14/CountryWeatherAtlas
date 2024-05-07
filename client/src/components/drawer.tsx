'use client'

import { Button, Drawer, Label, Textarea, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import blogService from '../services/blogs'
import Cookies from 'universal-cookie'

const CustomDrawer: CustomFlowbiteTheme['drawer'] = {
  root: {
    base: 'fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800',
    backdrop: 'fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80',
    edge: 'bottom-16',
    position: {
      top: {
        on: 'left-0 right-0 top-0 w-full transform-none',
        off: 'left-0 right-0 top-0 w-full -translate-y-full',
      },
      right: {
        on: 'right-0 top-0 h-screen w-80 transform-none',
        off: 'right-0 top-0 h-screen w-80 translate-x-full',
      },
      bottom: {
        on: 'bottom-0 left-0 right-0 w-full transform-none',
        off: 'bottom-0 left-0 right-0 w-full translate-y-full',
      },
      left: {
        on: 'left-0 top-0 h-screen w-80 transform-none',
        off: 'left-0 top-0 h-screen w-80 -translate-x-full',
      },
    },
  },
  header: {
    inner: {
      closeButton:
        'absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
      closeIcon: 'h-4 w-4',
      titleIcon: 'me-2.5 h-4 w-4',
      titleText:
        'mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400',
    },
    collapsed: {
      on: 'hidden',
      off: 'block',
    },
  },
  items: {
    base: '',
  },
}

export function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const cookies = new Cookies()
  // URL-encoded JSON string
  // Get the id cookie
  const idCookie = cookies.get('id')

  const submit = async e => {
    e.preventDefault()
    const newBlog = {
      user_id: idCookie.user_id,
      author: e.target.author.value,
      title: e.target.title.value,
      url: e.target.url.value,
    }
    await blogService.create(newBlog)
    setIsOpen(false)
  }

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex min-h-[10vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Create Blog</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Create Blog" titleIcon={FaPencil} />
        <Drawer.Items>
          <form onSubmit={submit}>
            <div className="mb-6 mt-3">
              <Label htmlFor="author" className="mb-2 block">
                Author
              </Label>
              <TextInput
                id="author"
                name="author"
                placeholder="Apple Keynote"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <Textarea
                id="title"
                name="title"
                placeholder="Write title description..."
                rows={4}
              />
            </div>
            <div className="mb-6 mt-3">
              <Label htmlFor="url" className="mb-2 block">
                Link
              </Label>
              <TextInput id="url" name="url" placeholder="Link" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
