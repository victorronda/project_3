import React, { useEffect, useState } from 'react';
import Navbar from '../../global/Navbar';
import { useLocation } from "react-router-dom";
import FormTable from './FormTable'


const MyTable = (props) => {
	const [ showFormTable, setShowFormTable ] = useState(false)
	const location = useLocation();


	useEffect(() => {
	 }, [location]);

	 const handleShowFormTable = (e) => {
		setShowFormTable(!showFormTable)
	}



	return (
		<div>
			<Navbar />
			<div>
				
						<div className="contEdit">
							<div className="editTables">
								<h2>You have {props.location.state.number} tables</h2>
							</div>
							<div className="btn-box">
								<button onClick={(e)=>handleShowFormTable(e)} className="nobutton btn-edit">
									<h3>Edit</h3>
								</button>
								
								<FormTable isDisplayed={showFormTable}/>
							</div>
						</div>
					
			</div>
		</div>
	);
};

export default MyTable;