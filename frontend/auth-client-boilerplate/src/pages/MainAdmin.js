import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { withAuth } from '../context/AuthProvider'
import Navbar from '../components/global/Navbar'
import tables_service from '../api/tables-service';

const MainAdmin = (props) => {
	const [ tables, setTables ] = useState([]);
	let tablesLength = tables.length
    
	const history = useHistory()
	
	useEffect(() => {
		showAll();
	}, []);

	const showAll = async () => {
		const showTables = await tables_service.showAllTables();
		setTables(showTables);
	};

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/admin/orderinfo')
    }

    const handleClickTable = (e) => {
		e.preventDefault()
		if(tablesLength> 0) {
			history.push("/tables", {number: tablesLength})
		} else {
			history.push("/tables/edit")
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
                <button className="nobutton" onClick={(e) => handleClick(e)}><h4>Order 1</h4></button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default withAuth(MainAdmin)
