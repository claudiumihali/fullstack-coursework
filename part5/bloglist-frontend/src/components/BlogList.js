import React, {useState, useEffect, useRef} from 'react'
import blogsService from '../services/blogsService'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import Notification from './Notification'
import Error from './Error'
import Togglable from './Togglable'

const BlogList = ({loggedInUser, logOut}) => {
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchBlogs = async() => {
            const blogs = await blogsService.getAll()
            setBlogs(blogs)
        }
        fetchBlogs()
    }, [])

    const createBlogFormRef = useRef()

    const createBlog = async(blog) => {
        try {
            const newBlog = await blogsService.create(blog)
            setBlogs(blogs.concat(newBlog))
            createBlogFormRef.current.toggleVisibility()
            setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            setTimeout(() => setNotificationMessage(''), 5000)
            return true
        } catch (exception) {
            setErrorMessage('give title and url')
            setTimeout(() => setErrorMessage(''), 5000)
            return false
        }
    }

    const like = async(blogId, likes) => {
        const updatedBlog = await blogsService.updateLikes(blogId, likes + 1)
        setBlogs(blogs.map((blog) => (blog.id === blogId) ? updatedBlog : blog))
    }

    const deleteBlog = async(blogToDelete) => {
        if (window.confirm(`Delete blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
            await blogsService.deleteBlog(blogToDelete.id)
            setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notificationMessage} />
            <Error message={errorMessage} />
            <p>{loggedInUser.name} logged in <button onClick={() => logOut()}>logout</button></p>
            <Togglable buttonLabel='create new blog' ref={createBlogFormRef} >
                <CreateBlogForm createBlog={createBlog} />
            </Togglable>
            <div>
                {blogs.sort((b1, b2) => b2.likes - b1.likes).map((blog) =>
                    (loggedInUser.id === blog.user || loggedInUser.id === blog.user.id) ?
                        <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog} />
                        :
                        <Blog key={blog.id} blog={blog} like={like} />
                )}
            </div>
        </div>
    )
}

export default BlogList
