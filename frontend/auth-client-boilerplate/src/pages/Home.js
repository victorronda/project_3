import React from 'react'
import { withAuth } from '../context/AuthProvider'
import { Link } from "react-router-dom"
import NavbarEm from '../components/global/NavbarEm'

const Home = () => {
    
    return (
        <div>
        <NavbarEm/>
        <div className="d-block text-center align-content-center" style={{margin: "8em auto"}}>
            <div>
            <h1 style={{fontSize: "120px"}}>MGBITE</h1>
            </div>
            <div className="mt-5">
            <Link style={{textDecoration: "none", color: "black", boxShadow: "0.1px 0.2px 0.2px 0.1px gray"}} className="px-5 py-2 my-5 signupButton" to="/signup">Signup</Link><br/>
            </div>
            
            <div className="mt-5">
                <p className="d-inline mr-3" style={{fontWeight: "bolder"}}><b>Already registered?</b></p>
                <Link style={{textDecoration: "none", color: "#576064"}} className="linksB" to="/employees/login">Login</Link>

            </div>
        </div>
        </div>
    )
}

export default withAuth(Home)
