import React from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"
import NavbarEm from '../components/global/NavbarEm'

const Home = () => {
    
    return (
        <div>
        <NavbarEm/>
        <div className="d-block text-center align-content-center" style={{margin: "8em auto"}}>
            <h1 style={{fontSize: "120px"}}>MGBITE</h1>
            <Link style={{textDecoration: "none"}} className="px-5 py-2 mb-4 signupButton " to="/signup">Signup</Link><br/>
            <p className="d-inline mr-3">Already registered?</p>
            <Link style={{textDecoration: "none"}} className="linksB" to="/employees/login">Login</Link>
        </div>
        </div>
    )
}

export default withAuth(Home)
