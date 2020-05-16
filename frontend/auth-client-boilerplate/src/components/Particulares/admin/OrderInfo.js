import React  from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../global/Navbar'

const OrderInfo = (props) => {
    console.log("props de infoOrder", props)
    console.log("dishes", props.location.state.dishesId)
    console.log("quantity", props.location.state.quantity)

    const history = useHistory()
    let dishes = props.location.state.dishesId // array de dishes
    let quantities = props.location.state.quantity // array quantity

    const handleClick = () => {
        history.push('/profile')
    }

    return (
        <div>
        <Navbar/>
            <div className="contOrder">
                <div className="cont-order">
                    <ul>
                    {dishes.length > 0 ? dishes.map((dish, i) => {
                    return(
                        <div className="list" key={dish.name}>
                            <li>
                            <h4>{quantities[i]} {dish.name}</h4>
                            </li>
                        </div>
                        )}) : <div className="center">No dish</div>}              
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