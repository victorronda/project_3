import React from 'react';
import auth from '../../api/auth-service';
import { withAuth } from '../../context/AuthProvider';

function navbarAdmin(props) {  

    return(
        <div className="navbarAdmin">
            <div>
                <p className="mb-0">MGBITE</p>
            </div>
            <div>
                <a className="right" href="/">Profile</a>
                <a className="right" href="/employees/staff">Staff</a>
                <button className="right" onClick={props.logout}>Logout</button>
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