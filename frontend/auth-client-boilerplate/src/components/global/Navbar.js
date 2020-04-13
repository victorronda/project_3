import React from 'react';
import { Link, useHistory } from "react-router-dom";
import auth from '../../api/auth-service';

export default function navbarAdmin() {  

    const history = useHistory()

    // FALLAA AQUIIIII

    const handleClick = (e) => {
        auth.logout()
        history.push('/signup')
    }

    return(
        <div className="navbarAdmin">
            <div>
                <p className="mb-0">MGBITE</p>
            </div>
            <div>
                <Link className="right" to="/">Profile</Link>
                <Link className="right" to="employees/staff">Staff</Link>
                <Link className="right" to="/signup" onClick={(e) => handleClick(e)}>Logout</Link>
            </div>
        </div>
    )
}

export function navbarClient() {

    return(
        <div>
            <div className="navbarClient">
                <p>MGBITE</p>
            </div>
        </div>
    )
}