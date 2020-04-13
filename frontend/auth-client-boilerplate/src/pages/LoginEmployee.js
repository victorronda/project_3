import React, { useState } from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const LoginEmployee = (props) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.loginEmployee({name, password})
    }

    return (
        <div>
            <h1>Login Employee</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <label>Name:</label>
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

            
            <Link to={"/admin/login"}>If you are the Admin, click here</Link>
        </div>
    )
}

export default withAuth(LoginEmployee)
