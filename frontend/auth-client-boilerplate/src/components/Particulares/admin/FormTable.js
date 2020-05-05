import React, { useState } from 'react'
import tables_service from '../../../api/tables-service';
import { useHistory } from 'react-router-dom';



const FormTable = () => {
    const [ number, setNumber ] = useState();
    
    const history = useHistory();

    const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await tables_service.editTables({ number });
			console.log({ message: 'Tables created successfully!' });
			history.push('/profile');
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <div>
     
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
            </div>
    )
}

export default FormTable
