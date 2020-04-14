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
        <div className="pageEm">
            <div className="formuEmplo">
                <div lassName="">
                    <h2 className="title">Login Employee</h2>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="labels">
                        <label><h4>Name</h4></label>
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
                    <div className="labels">
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
                        <input className="btn-login-em" type='submit' value='Login' />
                    </div>
                </form>
            </div>
            <div>
                <Link className="linksB" to={"/admin/login"}>If you are the Admin, click here</Link>
            </div>
        </div>
    )
}

export default withAuth(LoginEmployee)
