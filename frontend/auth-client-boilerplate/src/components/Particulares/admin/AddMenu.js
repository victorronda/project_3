import React, { useState } from 'react';
import menus_service from "../../../api/menus-service";
import dishes_service from "../../../api/dishes-service"; /* ME HE QUEDADO POR AQUÍ, falta añadir la ruta de get all dishes para 
listarlos en el form del menú */

import { useHistory } from "react-router-dom"


/* BACKEND ROUTE: POST /menus/add */

const AddMenu = () => {
	const [ name, setName ] = useState('');
    const [ dishes, setDishes ] = useState([]);
    const [ allDishes, setAllDishes ] = useState([]);

    const history = useHistory();

    const getAllDishes = (async () => {
       const allTheDishes = await dishes_service.getAllDishes()
        setAllDishes([...allDishes, allTheDishes])
    })()
    
    console.log(allDishes)


	const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenu = { name, dishes }
        try {
            await menus_service.saveNewMenu(newMenu)
            console.log({ message: 'New menu created successfully!' })
            history.push('/main_private')          
        } catch (error) {
            console.log(error)
        }
    };
    



	return (
		<div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={(e) => handleSubmit(e)} >
                
                {/* NAME OF THE MENU */}
				<label>Name of the menu:</label>
				<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                {/* AQUÍ FALTA TODO LO DE LOS DISHES */}
                <div></div>



                <input type="submit" value="ADD NEW MENU" />
			</form>
		</div>
	);
};

export default AddMenu;
