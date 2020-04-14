import React from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"

const Home = () => {
    
    return (
        <div className="d-block text-center align-content-center" style={{margin: "8em auto"}}>
            <h1 style={{fontSize: "120px"}}>MGBITE</h1>
            <Link className="px-5 py-2 mb-4 signupButton " to="/signup">Signup</Link><br/>
            <p className="d-inline mr-3">Already registered?</p>
            <Link className="linksB" to="/employee/login">Login</Link>
        </div>
    )
}

export default withAuth(Home)
