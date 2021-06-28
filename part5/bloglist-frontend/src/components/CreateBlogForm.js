import React, {useState} from 'react'

const CreateBlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async() => {
        const blog = {title, author, url}
        const success = await createBlog(blog)
        if (success) {
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <div>title: <input id='title' type='text' value={title} onChange={(event) => setTitle(event.target.value)} /></div>
            <div>author: <input id='author' type='text' value={author} onChange={(event) => setAuthor(event.target.value)} /></div>
            <div>url: <input id='url' type='text' value={url} onChange={(event) => setUrl(event.target.value)} /></div>
            <div><button id='createBlog' onClick={handleCreateBlog}>create</button></div>
        </div>
    )
}

export default CreateBlogForm
