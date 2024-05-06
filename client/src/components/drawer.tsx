'use client'

import {
  Button,
  Datepicker,
  Drawer,
  Label,
  Textarea,
  TextInput,
  theme,
} from 'flowbite-react'
import { useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import { HiUserAdd } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

export function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Create</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Create Blog" titleIcon={FaPencil} />
        <Drawer.Items>
          <form action="#">
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
            <Button className="w-full">Submit</Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
