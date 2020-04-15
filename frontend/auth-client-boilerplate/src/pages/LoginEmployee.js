import React, { useState } from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link, useHistory } from 'react-router-dom'

const LoginEmployee = (props) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    // const handleFormSubmit = (e) => {
    //     e.preventDefault()
    //     props.loginEmployee({name, password})
    // }

    const history = useHistory();

	const handleFormSubmit = async (e) => {
        e.preventDefault();
        await props.loginEmployee({ name, password })
        console.log({ message: 'Employee login' })
        history.push('/main/employee')     
        setName("")
        setPassword("")     
    };

    return (
        <div className="pageEm">
            <div className="formuEmplo">
                <div className="">
                    <h2 className="titleEm">Login Employee</h2>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="labelsEm">
                        <label><h4>Name</h4></label>
                    </div>
                    <div className="">
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
                    <div className="">
                        <input className="inputs"
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="">
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
