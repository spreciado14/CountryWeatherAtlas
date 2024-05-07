import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { FooterComponent } from '../components/footer'
import { DrawerComponent } from '../components/drawer'
import { CardComponent } from '../components/card'
import blogService from '../services/blogs'

function Home() {
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)

  useEffect(() => {
    blogService.getAll(currentPage).then(data => {
      console.log('Fetched data:', data)
      setBlogs(data)
      setNextPage(data.next_page)
    })
  }, [currentPage])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <DrawerComponent />
        <main className="flex-grow gap-20 flex flex-wrap justify-center items-center">
          {blogs &&
            blogs.map((blog, index) => (
              <CardComponent key={index} {...blog} email={blog.user.email} />
            ))}
        </main>
        <div className="flex justify-center mb-20">
          <button
            className="mx-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Previous
          </button>
          <button
            className="mx-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={nextPage === null}>
            Next
          </button>
        </div>
        <FooterComponent />
      </div>
    </>
  )
}

export default Home
