import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { FooterComponent } from '../components/footer'
import { DrawerComponent } from '../components/drawer'
import { CardComponent } from '../components/card'
import blogService from '../services/blogs'
import { Blog } from '../types/types'

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNextPage] = useState(null)

  useEffect(() => {
    blogService.getAll(currentPage).then(data => {
      console.log('Fetched data:', data)
      setBlogs(data)
      setNextPage(data.next_page)
    })
  }, [currentPage, blogs])

  const handleDelete = async (blogId: string) => {
    try {
      await blogService.remove(blogId) // replace this with your actual API call
      // After successful deletion, you might want to update your blogs state
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (id: string, newBlogData: Blog) => {
    try {
      const updatedBlog = await blogService.update(id, newBlogData)
      setBlogs(blogs.map(blog => (blog.id === id ? updatedBlog : blog)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <DrawerComponent />
        <main className="flex-grow gap-20 flex flex-wrap justify-center items-center">
          {blogs &&
            blogs.map((blog, index) => (
              <CardComponent
                key={index}
                {...blog}
                email={blog.user ? blog.user.email : 'No email'}
                onDelete={handleDelete}
                onEdit={handleEdit}
                id={blog.id}
              />
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
