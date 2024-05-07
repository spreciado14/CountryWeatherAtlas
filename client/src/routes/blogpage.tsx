import { useEffect, useState } from 'react'
import NavbarComponent from '../components/navbar'
import { FooterComponent } from '../components/footer'
import { DrawerComponent } from '../components/drawer'
import { CardComponent } from '../components/card'
import blogService from '../services/blogs'

function Home() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService.getAll().then(data => setBlogs(data))
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <DrawerComponent />
        <main className="flex-grow flex flex-wrap justify-center items-center">
          {blogs.flatMap((user, index) =>
            user.blogs.map((blog, blogIndex) => (
              <div key={`${index}-${blogIndex}`} className="m-4 max-w-sm">
                <CardComponent
                  author={blog.author}
                  email={user?.email}
                  url={blog.url}
                  title={blog.title}
                />
              </div>
            ))
          )}
        </main>
        <FooterComponent />
      </div>
    </>
  )
}

export default Home
