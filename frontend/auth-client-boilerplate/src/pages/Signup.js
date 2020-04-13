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
        <div className="pageSignup">
            <div className="formuSignup">
                <div>
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div>
                        <label><h4>Company name</h4></label>
                    </div>
                    <div>
                        <input className="inputs"
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <label><h4>Email</h4></label>
                    </div>
                    <div>
                        <input className="inputs"
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <label><h4>Password</h4></label>
                    </div>
                    <div>
                        <input className="inputs"
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <label><h4>Confirm Password</h4></label>
                    </div>
                    <div>
                        <input className="inputs"
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </div>

                    <div>{error}</div>

                    <div>
                        <input className="btn-login-signup" type='submit' value='Signup' />
                    </div>
                </form>
                <div>
                    <p>Already have account?<Link className="linksB" to={"/employee/login"}> Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Signup)
