const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const api = supertest(app)

beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('user', 10)
    const user = new User({username: 'user', password: passwordHash, name: 'user'})
    await user.save()
})

test('POST /api/users sucessfully creates a new user when username and password are valid', async() => {
    const newUser = {
        username: 'newUser',
        password: 'newUser',
        name: 'newUser'
    }

    const savedUser = await api.post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const {id, blogs, ...savedUserData} = savedUser.body
    delete newUser.password
    expect(savedUserData).toEqual(newUser)

    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(2)

    const usersDataAfterSave = usersAfterSave.map((user) => {
        const {id, blogs, ...userData} = user
        return userData
    })
    expect(usersDataAfterSave).toContainEqual(newUser)
})

test('POST /api/users with username that is already in use returns with the status code 400', async() => {
    const newUser = {
        username: 'user',
        password: 'user1',
        name: 'user1'
    }

    const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('`username` to be unique')

    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

test('POST /api/users with username that is shorter than 3 characters returns with the status code 400', async() => {
    const newUser = {
        username: 'us',
        password: 'user1',
        name: 'user1'
    }

    const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

test('POST /api/users with password that is shorter than 3 characters returns with the status code 400', async() => {
    const newUser = {
        username: 'user1',
        password: 'p',
        name: 'user1'
    }

    const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAfterSave = await helper.usersInDb()
    expect(usersAfterSave).toHaveLength(1)
})

afterAll(() => {
    mongoose.connection.close()
})
