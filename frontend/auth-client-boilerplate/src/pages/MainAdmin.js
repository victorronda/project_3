import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { withAuth } from '../context/AuthProvider'
import Navbar from '../components/global/Navbar'
import orders_service from '../api/orders-service';

const MainAdmin = (props) => {

	const [ tables ] = useState([]);
    const [ allOrders, setAllOrders ] = useState([]);
	
	const history = useHistory()
	
	useEffect(() => {
		showAll();
	}, []);
    // Poner allOrders para que se actualice al subir a heroku

	const showAll = async () => {
		const showOrders = await orders_service.getAllOrders()
		setAllOrders(showOrders);
	};

    const orderClick = async (e) => {
        console.log('orderclick', e)
        const theOrder = await orders_service.getOrder(e.target.value)
        history.push('/admin/orderinfo', theOrder)
    }

    let tablesLength = tables.length
    const handleClickTable = (e) => {
		e.preventDefault()
		if (tablesLength > 0) {
			history.push("/tables", {number: tablesLength})
		} else {
			history.push("/tables/edit")
		}
    }

    const deleteOrders = async (e) => {
        e.preventDefault()
        const orderId = e.target.value
        const tableId = e.target.table
        try {
            await orders_service.deleteOrder(orderId, tableId)
            console.log({ message: 'Employee deleted!' })
            const newArr = allOrders.filter((item) => item._id !== orderId)    
            setAllOrders(newArr)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        <Navbar/>
        <div className="contMain">
            <div className="contMy">
                <div className="my">
                    <Link style={{textDecoration: "none"}} className="links" to='/menus/admin'><h3>My menu</h3></Link>
                </div>
                <div className="my">
                    <Link style={{textDecoration: "none"}} className="links" to='/dishes/add'><h3>My dishes</h3></Link>
                </div>
                <div className="my">
                    <button className="nobutton" onClick={(e) => handleClickTable(e)}><h3>My tables</h3></button>
                </div>
            </div>
            <div className="contMy">
                <button className="orders"><h3>Preference order</h3></button>
            <div className="ordersTa">
                <ul>
                    {allOrders.length > 0 ? allOrders.map((order) => {
                    return(
                        <div className="list" key={order.tableId[0].number}>
                            <li>
                            <button className='' value={order._id}
                            onClick={(e) => orderClick(e)}>Table {order.tableId[0].number} 
                            </button>
                            </li>
                            <div><button className="nobutton btn-del" value={order._id} table={order.tableId[0]}
                            onClick={(e) => deleteOrders(e)}>Delete</button></div>
                        </div>
                        )}) : <div className="center">No orders</div>}              
                </ul>
            </div>
            </div>
        </div>
        </div>
    )
}

export default withAuth(MainAdmin)

/*
Falta enviar los datos a OrderInfo
Opciones:
- useLocation
- props
- generarlos en OrderInfo llamando la coleccion entera y coger lo que queramos
*/