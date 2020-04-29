import React, { useState } from 'react';
import { withAuth } from '../../../context/AuthProvider'
import menus_service from "../../../api/menus-service";
import { useHistory } from "react-router-dom"
import Navbar from '../../global/Navbar';


/* BACKEND ROUTE: POST /menus/add */

const AddMenu = () => {
	const [ name, setName ] = useState('');


    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenuName = { name }
        try {
            await menus_service.saveNewMenuName(newMenuName)
            console.log({ message: 'New menu created successfully!' })
            history.push('/menus/admin')          
        } catch (error) {
            console.log(error)
        }
    };

	return (
        <div>
        <Navbar/>
        <div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={(e) => handleSubmit(e)} >
                
                {/* NAME OF THE MENU */}
				<label>Name of the menu:</label>
				<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="submit" value="ADD NEW MENU" />
			</form>
		</div>
        </div>
	);
};

export default withAuth(AddMenu);
