import { useState } from "react"
import { login } from "../services/notes/login"

const LoginForm = ({ setUser, setToken, setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')




    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await login({ username, password })
            window.localStorage.setItem(
                'USER_LOCAL_STORAGE', JSON.stringify(data)
            )
            setUser(data)
            setToken(data.token)
            setUsername('')
            setPassword('')
        } catch (error) {
            setError('Wrong credentials')
            setTimeout(() => {
                setError(null)
            }, 5000);
        }

    }


    return (
        <>
            <h2 style={{ color: "green" }}>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    placeholder='username'
                    value={username}
                    name='username'
                    onChange={({ target }) => setUsername(target.value)} />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    name='password'
                    onChange={({ target }) => setPassword(target.value)} />
                <button>Login</button>
            </form>
        </>
    )
}

export default LoginForm
