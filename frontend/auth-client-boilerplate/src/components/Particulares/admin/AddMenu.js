import React, { useState, useEffect } from 'react';
import { withAuth } from '../../../context/AuthProvider'
import menus_service from "../../../api/menus-service";
import dishes_service from "../../../api/dishes-service"; /* ME HE QUEDADO POR AQUÍ, falta añadir la ruta de get all dishes para 
listarlos en el form del menú */
import { useHistory } from "react-router-dom"
import Navbar from '../../global/Navbar';


/* BACKEND ROUTE: POST /menus/add */

const AddMenu = () => {
	const [ name, setName ] = useState('');
    const [ dishes, setDishes ] = useState([]);
    const [ allDishes, setAllDishes ] = useState([]);

    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenu = { name, dishes }
        try {
            await menus_service.saveNewMenu(newMenu)
            console.log({ message: 'New menu created successfully!' })
            history.push('/profile')          
        } catch (error) {
            console.log(error)
        }
    };
    

    
    useEffect(() => {
        setAllDishes(getAllDishes()) 
    },[]);
    
    const getAllDishes = async () => {
       const allTheDishes = await dishes_service.getAllDishes()
        setAllDishes(allTheDishes)
    }



  


	return (
        <div>
        <Navbar/>
        <div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={(e) => handleSubmit(e)} >
                
                {/* NAME OF THE MENU */}
				<label>Name of the menu:</label>
				<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                
                <ul>
                    {allDishes.length > 0 ? allDishes.map((elem,index) => {
                        return (
                                <li key={index}>{elem.name}</li> 
                            )
                    }) : <div>No dishes</div> }
                </ul>



                <input type="submit" value="ADD NEW MENU" />
			</form>
		</div>
        </div>
	);
};

export default withAuth(AddMenu);
