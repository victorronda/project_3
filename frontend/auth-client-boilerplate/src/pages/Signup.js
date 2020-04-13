import React, { useState } from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const Signup = (props) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError("Passwords don't match")} 
        props.signup({name, email, password})
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={(e) => handleFormSubmit(e)}>
            <label>Company name:</label>
            <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Email:</label>
            <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <label>Confirm Password:</label>
            <input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <div>{error}</div>

            <input type='submit' value='Signup' />
            </form>

            <p>Already have account?</p>
            <Link to={"/employee/login"}> Login</Link>
        </div>
    )
}

export default withAuth(Signup)
