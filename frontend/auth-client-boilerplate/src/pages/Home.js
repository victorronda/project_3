import React from 'react'
import { withAuth } from '../context/AuthProvider'
import { useHistory } from "react-router-dom"

const Home = () => {

    const history = useHistory();

    const handleClick = (e) => {
        history.push('/signup')
    }

    
    return (
        <div className="d-block text-center align-content-center" style={{margin: "8em auto"}}>
            <h1 style={{fontSize: "120px"}}>MGBITE</h1>
            <button onClick={e=>handleClick(e)} className="px-5 py-2 mb-4 signupButton" >Signup</button><br/>
            <p className="d-inline mr-3">Already registered?</p>
            <a  href="/employee/login">Login</a>
        </div>
    )
}

export default withAuth(Home)
