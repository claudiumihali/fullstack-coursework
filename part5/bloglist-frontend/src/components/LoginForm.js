import React, {useState} from 'react'
import Error from './Error'

const LoginForm = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async(event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        const credentials = {username, password}
        const success = await login(credentials)
        if (!success) {
            setErrorMessage('wrong username or password')
            setTimeout(() => setErrorMessage(''), 5000)
        }
    }

    return (
        <div>
            <h2>log in to application</h2>
            <Error message={errorMessage} />
            <form onSubmit={handleLogin}>
                <div>username <input id='username' type='text' value={username} onChange={(event) => setUsername(event.target.value)} /></div>
                <div>password <input id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} /></div>
                <div><button type='submit'>login</button></div>
            </form>
        </div>
    )
}

export default LoginForm
