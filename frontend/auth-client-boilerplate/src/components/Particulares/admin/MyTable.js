import React, { useState, useEffect } from 'react';
import tables_service from '../../../api/tables-service';
import { useHistory } from 'react-router-dom';
import Navbar from '../../global/Navbar';
import FormTable from './FormTable'


const MyTable = () => {
	const [ number, setNumber ] = useState();
	const [ tables, setTables ] = useState([]);


	const history = useHistory();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await tables_service.editTables({ number });
			console.log('numbeeer', number);
			console.log({ message: 'Tables created successfully!' });
			history.push('/profile');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		showAll();
	}, []);

	const showAll = async () => {
		const showTables = await tables_service.showAllTables();
		setTables(showTables);
	};


	/* // Tenemos que arreglar esta parte
	const formTable = () => {
      
            return(
            <div className="pageTable">
                <form className="formuTable" onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="title">
                        <label>
                            <h2>How many tables do you have?</h2>
                        </label>
                    </div>
                    <div className="contOrders">
                        <input
                            className="inputs"
                            type="number"
                            name="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input className="btn-add-table" type="submit" value="Add" />
                    </div>
                </form>
            </div>
        )}  */

        
        

	const handleClickEdit = (e) => {
		// Hacer que renderice al hableFormSubmit
			return (<div className="pageTable">
            <form className="formuTable" onSubmit={(e) => handleFormSubmit(e)}>
                <div className="title">
                    <label>
                        <h2>How many tables do you have?</h2>
                    </label>
                </div>
                <div className="contOrders">
                    <input
                        className="inputs"
                        type="number"
                        name="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input className="btn-add-table" type="submit" value="Add" />
                </div>
            </form>
        </div>);
		
	};

	return (
		<div>
			<Navbar />
			<div>
				<div>
					{tables.length > 0 ? (
						<div className="contEdit">
							<div className="editTables">
								<h2>You have {tables.length} tables</h2>
							</div>
							<div className="btn-box">
								<button className="nobutton btn-edit" onClick={(e) => handleClickEdit(e)}>
									<h3>Edit</h3>
								</button>
							</div>
						</div>
					) : 
                    <FormTable />
					}
				</div>
			</div>
		</div>
	);
};

export default MyTable;
