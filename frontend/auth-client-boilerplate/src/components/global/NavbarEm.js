import React from 'react'
import { Link } from "react-router-dom";

function NavbarEm() {

     return(
        <div>
            <div className="navbarClient">
                <Link style={{textDecoration: "none"}} className="links mb-0" to='/'>MGBITE</Link>
            </div>
        </div>
    )
}

export default NavbarEm