'use client'

import { Button, Drawer, Label, Textarea, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import blogService from '../services/blogs'
import Cookies from 'universal-cookie'

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
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Create</Button>
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
