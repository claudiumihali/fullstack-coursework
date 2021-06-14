const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const api = supertest(app)

let token = ''

beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('user', 10)
    const user = new User({username: 'user', password: passwordHash, name: 'user'})
    await user.save()

    const login = await api.post('/api/login').send({username: 'user', password: 'user'})
    token = login.body.token

    await Blog.deleteMany({})

    const blogs = helper.initialBlogs.map((blog) => {
        blog.user = user._id
        return new Blog(blog)
    })
    const savePromises = blogs.map((blog) => blog.save())
    await Promise.all(savePromises)
})

test('GET /api/blogs returns the correct amount of blogs', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('each blog has an unique identifier named id', async() => {
    const response = await api.get('/api/blogs')
    response.body.map((blog) => expect(blog.id).toBeDefined())
})

test('POST /api/blogs successfully creates a new blog', async() => {
    const newBlog = {
        title: 'title',
        url: 'url',
        likes: 0
    }

    const savedBlog = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const {id, author, user, ...savedBlogData} = savedBlog.body
    expect(savedBlogData).toEqual(newBlog)

    const blogsAfterSave = await helper.blogsInDb()
    expect(blogsAfterSave).toHaveLength(helper.initialBlogs.length + 1)
    
    const blogsDataAfterSave = blogsAfterSave.map((blog) => {
        const {id, author, user, ...blogData} = blog
        return blogData
    })
    expect(blogsDataAfterSave).toContainEqual(newBlog)
})

test('POST /api/blogs with likes property missing defaults the likes property of the saved object to 0', async() => {
    let newBlog = {
        title: 'title',
        url: 'url'
    }

    const savedBlog = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    newBlog.likes = 0
    
    const {id, author, user, ...savedBlogData} = savedBlog.body
    expect(savedBlogData).toEqual(newBlog)

    const blogsAfterSave = await helper.blogsInDb()
    expect(blogsAfterSave).toHaveLength(helper.initialBlogs.length + 1)
    
    const blogsDataAfterSave = blogsAfterSave.map((blog) => {
        const {id, author, user, ...blogData} = blog
        return blogData
    })
    expect(blogsDataAfterSave).toContainEqual(newBlog)
})

test('POST /api/blogs with title and url properties missing returns with the status code 400', async() => {
    const newBlog = {
        likes: 0
    }

    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('DELETE /api/blogs/:id with valid id successsfully deletes the blog with the given id', async() => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete).not.toContainEqual(blogToDelete)
})

test('PUT /api/blogs/:id updates the amount of likes of the blog with the given id', async() => {
    const blogs = await helper.blogsInDb()
    let blogToUpdate = blogs[0]

    const newBlogData = {
        likes: 777
    }

    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    blogToUpdate.likes = newBlogData.likes
    blogToUpdate.user = blogToUpdate.user.toString()

    expect(updatedBlog.body).toEqual(blogToUpdate)

    const blogsAfterUpdate = await helper.blogsInDb()
    const blogsDataAfterUpdate = blogsAfterUpdate.map((blog) => {
        blog.user = blog.user.toString()
        return blog
    })
    expect(blogsDataAfterUpdate).toContainEqual(blogToUpdate)
})

test('POST /api/blogs without token returns with the status code 401', async() => {
    const newBlog = {
        title: 'title',
        url: 'url',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})
