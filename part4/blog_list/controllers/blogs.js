const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    let inputBlog = request.body
    if (inputBlog.title === undefined && inputBlog.url === undefined) {
        return response.status(400).end()
    }
    if (inputBlog.likes === undefined) {
        inputBlog.likes = 0
    }
    inputBlog.user = user._id
    inputBlog.author = user.name

    const blog = new Blog(inputBlog)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
    const user = request.user
    if (!user) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete) {
        return response.status(401).json({error: 'invalid id'})
    }

    if (blogToDelete.user.toString() !== user._id.toString()) {
        return response.status(401).json({error: 'only the blog creator can delete it'})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
    const inputBlogData = request.body
    let updatedBlogData = {}
    if (inputBlogData.title) {
        updatedBlogData.title = inputBlogData.title
    }
    if (inputBlogData.author) {
        updatedBlogData.author = inputBlogData.author
    }
    if (inputBlogData.url) {
        updatedBlogData.url = inputBlogData.url
    }
    if (inputBlogData.likes) {
        updatedBlogData.likes = inputBlogData.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData, {new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter
