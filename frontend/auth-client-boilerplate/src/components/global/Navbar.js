import React from 'react';
import { Link } from "react-router-dom";
import { withAuth } from '../../context/AuthProvider';

function navbarAdmin(props) {  

    return(
        <div className="navbarAdmin">
            <div>
                <Link style={{textDecoration: "none"}} className="links mb-0" to='/'>MGBITE</Link>
            </div>
            <div>
                <Link style={{textDecoration: "none"}} className="links right" to='/profile'>Profile</Link>
                <Link style={{textDecoration: "none"}} className="links right" to='/staff'>Staff</Link>
                <button style={{textDecoration: "none"}} className="right nobutton" onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}

export default withAuth(navbarAdmin)

export function navbarClient() {

    return(
        <div>
            <div className="navbarClient">
                <Link className="links mb-0" to='/'>MGBITE</Link>
            </div>
        </div>
    )
}