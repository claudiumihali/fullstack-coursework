import React, {useState} from 'react'

const Blog = ({blog, like, deleteBlog}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const showWhenVisible = {display: (visible) ? '' : 'none'}
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} <button onClick={toggleVisibility}>{(visible) ? 'hide' : 'show'}</button>
            </div>
            <div style={showWhenVisible}>
                {blog.url}<br />
                likes {blog.likes} <button className='like' onClick={() => like(blog.id, blog.likes)}>like</button><br />
                {(deleteBlog) ?
                    <button onClick={() => deleteBlog(blog)}>delete</button>
                    :
                    <div></div>}
            </div>
        </div>
    )
}

export default Blog
