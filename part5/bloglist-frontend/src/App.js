import './App.css'
import React, {useState, useEffect} from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogsService from './services/blogsService'
import loginService from './services/loginService'

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(() => {
        const user = window.localStorage.getItem('loggedInUser')
        if (user) {
            const userObj = JSON.parse(user)
            setLoggedInUser(userObj)
            blogsService.setToken(userObj.token)
        }
    }, [])

    const login = async(credentials) => {
        try {
            const user = await loginService.login(credentials)
            setLoggedInUser(user)
            blogsService.setToken(user.token)
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            return true
        } catch (exception) {
            return false
        }
    }

    const logOut = () => {
        setLoggedInUser(null)
        blogsService.setToken(null)
        window.localStorage.removeItem('loggedInUser')
    }

    return (
        <div>
            {(loggedInUser === null) ?
                <LoginForm login={login} />
                :
                <BlogList loggedInUser={loggedInUser} logOut={logOut} />}
        </div>
    )
}

export default App
