import React, { useState, useEffect } from 'react'
import { withAuth } from '../../../context/AuthProvider'

const Staff = (props) => {
    console.log("props en staff?", props)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.addEmployee({name, password})
        setMessage('Employee created successfully!')
        setName("")
        setPassword("")
    }

    /* PREGUNTAR!!!    useEffect(() => {
    const timerMessage = setTimeout(setMessage(""), 1000);
    return () => clearTimeout(timerMessage);
  }, []); */

    return (
        <div className="page">
                <div className="cont formu">
                    <div className="contOrders">
                        <h2 className="title">Add Employee</h2>
                    </div>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="labels">
                            <label><h4>Name</h4></label>
                        </div>
                        <div className="contOrders">
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
                        <div className="contOrders">
                            <input className="inputs"
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="contOrders put">
                            <input className="btn-login" type='submit' value='Submit' />
                        </div>
                    </form>
                </div>
                {message}
            <div className="cont2">
                <div className="contOrders">
                    <h2 className="">My employees</h2>
                </div>
                <div className="enum">
                    <ul>
                    <li>Employee 1</li>
                    <li>Employee 2</li>
                    <li>Employee 3</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Staff)
