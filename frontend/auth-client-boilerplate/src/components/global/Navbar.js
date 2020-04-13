import React from 'react';
import { Link } from "react-router-dom";

export default function navbarAdmin() {

    return(
        <div className="navbarAdmin">
            <div>
                <p>MGBITE</p>
            </div>
            <div>
                <Link className="right" to="/">Profile</Link>
                <Link className="right" to="employees/staff">Staff</Link>
                <Link className="right" to="/auth/logout">Logout</Link>
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