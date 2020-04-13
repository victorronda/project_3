import React from 'react';
import auth from '../../api/auth-service';

export default function navbarAdmin() {  

    

    // FALLAA AQUIIIII

    const handleClick = (e) => {
        auth.logout()
    }

    return(
        <div className="navbarAdmin">
            <div>
                <p className="mb-0">MGBITE</p>
            </div>
            <div>
                <a className="right" href="/">Profile</a>
                <a className="right" href="/employees/staff">Staff</a>
                <a className="right" href="/signup" onClick={(e) => handleClick(e)}>Logout</a>
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