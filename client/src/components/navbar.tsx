'use client'

import { googleLogout } from '@react-oauth/google'
import { Avatar, CustomFlowbiteTheme, Dropdown, Navbar } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useUser } from '../stores/userContext'

const CustomNavbar: CustomFlowbiteTheme['navbar'] = {
  root: {
    base: 'bg-gray-100 px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-10 border-b',
    rounded: {
      on: 'rounded',
      off: '',
    },
    bordered: {
      on: 'border',
      off: '',
    },
    inner: {
      base: 'mx-auto flex flex-wrap items-center justify-between',
      fluid: {
        on: '',
        off: 'container',
      },
    },
  },
  brand: {
    base: 'flex items-center',
  },
  collapse: {
    base: 'w-full md:block md:w-auto',
    list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
    hidden: {
      on: 'hidden',
      off: '',
    },
  },
  link: {
    base: 'block py-2 pl-3 pr-4 md:p-0',
    active: {
      on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700',
      off: 'border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
    },
    disabled: {
      on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
      off: '',
    },
  },
  toggle: {
    base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden',
    icon: 'h-6 w-6 shrink-0',
  },
}

export default function NavbarComponent() {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const handleLogout = () => {
    cookies.remove('token')
    googleLogout()
    navigate('/login')
  }

  const { name, email, picture } = useUser()

  return (
    <Navbar theme={CustomNavbar} fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/favicon.svg"
          className="h-6 sm:h-7"
          alt="CountryWeatherAtlas"
        />
      </Navbar.Brand>
      <div className="ml-28 flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={picture} rounded />}>
          <Dropdown.Header>
            <span className="block text-sm">{name}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigate('/profile')}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/settings')}>
            Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" onClick={() => navigate('/')} active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#" onClick={() => navigate('/single')}>
          Countries
        </Navbar.Link>
        <Navbar.Link href="#" onClick={() => navigate('/blogs')}>
          Blogs
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
