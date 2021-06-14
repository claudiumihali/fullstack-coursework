const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async(request, response) => {
    const inputCredentials = request.body

    const user = await User.findOne({username: inputCredentials.username})
    
    const validCredentials = (user) ? await bcrypt.compare(inputCredentials.password, user.password) : false

    if (!validCredentials) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter
