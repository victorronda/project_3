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
        <div className="pageAd">
        <div className="formuAdmin">
            <div lassName="">
                <h2 className="titleEm">Login Admin</h2>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className="labelsEm">
                    <label><h4>Company name</h4></label>
                </div>
                <div lassName="">
                    <input className="inputs"
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <div className="labelsEm">
                    <label><h4>Password</h4></label>
                </div>
                <div lassName="">
                    <input className="inputs"
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <div lassName="">
                    <input className="btn-login-ad" type='submit' value='Login' />
                </div>
            </form>
        </div>
        </div>
    )
}

export default withAuth(LoginAdmin)
