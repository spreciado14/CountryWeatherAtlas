/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react'

interface UserContextProps {
  name: string
  email: string
  picture: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPicture: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')

  return (
    <UserContext.Provider
      value={{ name, email, picture, setName, setEmail, setPicture }}>
      {children}
    </UserContext.Provider>
  )
}
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
