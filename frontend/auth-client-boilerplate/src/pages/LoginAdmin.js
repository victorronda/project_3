import React, { useState } from 'react'
import { withAuth } from '../context/AuthProvider'

const LoginAdmin = (props) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.loginAdmin({name, password})
    }

    return (
        <div>
            <h1>Login Admin</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <label>Company name:</label>
            <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Password:</label>
            <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default withAuth(LoginAdmin)
