import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '../context/AuthProvider'
import Navbar from '../components/global/Navbar'

const MainAdmin = (props) => {
    

    return (
        <div>
        <Navbar/>
        <div>
            <div className="contMy">
                <div className="my">
                    <Link style={{textDecoration: "none"}} className="links" to='/menus/admin'><h3>My menu</h3></Link>
                </div>
                <div className="my">
                    <Link style={{textDecoration: "none"}} className="linksA" to='/dishes/add'><h3>My dishes</h3></Link>
                </div>
                <div className="my">
                    <Link style={{textDecoration: "none"}} className="linksA" to='/tables'><h3>My tables</h3></Link>
                </div>
            </div>
            <div className="contOrders">
                <button className="links orders"><h3>Preference order</h3></button>
            </div>
        </div>
        </div>
    )
}

export default withAuth(MainAdmin)
