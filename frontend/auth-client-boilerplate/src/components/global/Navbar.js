import React from 'react';
import { Link } from "react-router-dom";
import { withAuth } from '../../context/AuthProvider';

function navbarAdmin(props) {  

    return(
        <div className="navbarAdmin">
            <div>
                <Link className="links mb-0" to='/'>MGBITE</Link>
            </div>
            <div>
                <Link className="links right" to='/profile'>Profile</Link>
                <Link className="links right" to='/staff'>Staff</Link>
                <button className="right nobutton" onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}

export default withAuth(navbarAdmin)

// export function navbarClient() {

//     return(
//         <div>
//             <div className="navbarClient">
//                 <p>MGBITE</p>
//             </div>
//         </div>
//     )
// }