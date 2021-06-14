const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const logger = require('../utils/logger')

usersRouter.post('/', async(request, response) => {
    const inputUser = request.body
    if (!inputUser.password || inputUser.password.length < 3) {
        const error = {error: 'password is shorter than the minimum allowed length (3)'}
        logger.error(error.error)
        return response.status(400).json(error)
    }

    const saltLength = 10
    const passwordHash = await bcrypt.hash(inputUser.password, saltLength)

    const user = new User({
        username: inputUser.username,
        password: passwordHash,
        name: inputUser.name
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
})

module.exports = usersRouter
