import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../global/Navbar'

const OrderInfo = () => {

    const history = useHistory()

    const handleClick = () => {
        history.push('/profile')
    }

    return (
        <div>
        <Navbar/>
            <div className="contOrder">
                <div className="cont-order">
                    <div className="title">
                        <h2>Order: Table (filter n mesa)</h2>
                    </div>
                    <ul className="orderList">
                        <li><h4>2 Example</h4></li>
                        <li><h4>1 Example</h4></li>
                        <li><h4>3 Example</h4></li>
                        <li><h4>2 Example</h4></li>
                        <li><h4>2 Example</h4></li>
                    </ul>
                </div>
            <div>
                <button className="nobutton btn-goback" onClick={handleClick}><h3>Go Back</h3></button>
            </div>
            </div>
        </div>
    )
}

export default OrderInfo
