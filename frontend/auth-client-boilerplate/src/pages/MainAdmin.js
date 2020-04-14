import React from 'react'
import { Link } from 'react-router-dom'

const MainAdmin = (props) => {
    return (
        <div>
            <div className="contMy">
                <div className="my">
                    <Link className="links" to='/menu'><h3>My menu</h3></Link>
                </div>
                <div className="my">
                    <Link className="links" to='/dishes'><h3>My dishes</h3></Link>
                </div>
                <div className="my">
                    <Link className="links" to='/tables'><h3>My tables</h3></Link>
                </div>
            </div>
            <div className="contOrders">
                <button className="links orders"><h3>Preference order</h3></button>
            </div>
        </div>
    )
}

export default MainAdmin
