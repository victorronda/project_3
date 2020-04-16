import React from 'react';
import { Link } from "react-router-dom";
import { withAuth } from '../../context/AuthProvider';

function Navbar(props) {  

    return(
        <div className="navbarAdmin">
            <div>
                <Link style={{textDecoration: "none"}} className="links mb-0" to='/'>MGBITE</Link>
            </div>
            <div>
                <Link style={{textDecoration: "none"}} className="links right" to='/profile'>Profile</Link>
                { /* <Link className="links right" to='/staff'>Staff</Link> */ }
                <button style={{textDecoration: "none"}} className="right nobutton" onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}

export default withAuth(Navbar)