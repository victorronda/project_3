import React, { useState, useEffect } from 'react';
import { withAuth } from '../../../context/AuthProvider';
import menus_service from '../../../api/menus-service';
import dishes_service from '../../../api/dishes-service'; /* ME HE QUEDADO POR AQUÍ, falta añadir la ruta de get all dishes para 
listarlos en el form del menú */

import { useHistory } from 'react-router-dom';
import Navbar from '../../global/Navbar';

/* BACKEND ROUTE: POST /menus/add */

const MenuAdmin = () => {
	const [ dishes, setDishes ] = useState([]);
	const [ allDishes, setAllDishes ] = useState([]);
	const [ myMenu, setMyMenu ] = useState([]);
	const [ typeItem, setTypeItem ] = useState('Dessert');

	const history = useHistory();

	useEffect(() => {
		getAllDishes();
		getTheMenu();
	}, []);

	const handleSubmitDeleteMenu = async (e,id) => {
        e.preventDefault();
			try {
			await menus_service.deleteMyMenu(id);
			console.log({ message: 'New menu deleted!'});
			history.push('/profile');
		} catch (error) {
			console.log(error);
		}
	};

	const getAllDishes = async () => {
		const allTheDishes = await dishes_service.getAllDishes();
		setAllDishes(allTheDishes);
	};

	const getTheMenu = async () => {
		const theMenu = await menus_service.getMyMenu();
		setMyMenu(theMenu);
	};



	return (
		<div>
		<Navbar/>
		<div className="d-flex flex-row w-100 text-center mh-100" style={{backgroundColor: "#81cfca", padding: "10vh"}}>

            
			
				{/* NAME OF MY MENU */}

				{myMenu.length > 0 ? myMenu.map((menu, i) => {
                return(
                <div key={i} className="card d-flex justify-content-center align-items-center text-center mx-auto w-50" style={{margin: "4rem 0"}}>

                        <form
                className="card-body w-100"
                onSubmit={(e) => handleSubmitDeleteMenu(e,myMenu[0]._id)}
                style={{boxShadow: "1px 1.5px 1.5px 1px #3EC0B8"}}
			    >
                    <h1 className="w-100 mx-2 mb-5" key={i}>{menu.name}</h1>
                    <div className="d-flex flex-row justify-content-between w-100">
					<div className="card-item col-6">
						<h5>Entree</h5>
						<ul>
							{allDishes.length > 0 ? (
								allDishes.filter((entree) => entree.typeItem === 'Entree').map((elem, index) => {
									return (
										<div key={index}>
											<li key={index}>{elem.name}</li>
										</div>
									);
								})
							) : (
								<div>No dishes</div>
							)}
						</ul>
					</div>
					<div className="card-item col-6 w-100">
						<h5>Second Course</h5>
						<ul>
							{allDishes.length > 0 ? (
								allDishes
									.filter((secondCourse) => secondCourse.typeItem === 'Second Course')
									.map((elem, index) => {
										return (
											<div key={index}>
												<li key={index}>{elem.name}</li>
											</div>
										);
									})
							) : (
								<div>No dishes</div>
							)}
						</ul>
					</div>
				</div>

				<div className="row container-fluid">
					<div className="card-item col-6 w-100">
						<h5>Dessert</h5>
						<ul>
							{allDishes.length > 0 ? (
								allDishes.filter((dessert) => dessert.typeItem === 'Dessert').map((elem, index) => {
									return (
										<div key={index}>
											<li key={index}>{elem.name}</li>
										</div>
									);
								})
							) : (
								<div>No dishes</div>
							)}
						</ul>
					</div>
					<div className="card-item col-6 w-100">
						<h5>Drinks</h5>
						<ul>
							{allDishes.length > 0 ? (
								allDishes.filter((drinks) => drinks.typeItem === 'Drinks').map((elem, index) => {
									return (
										<div key={index}>
											<li key={index}>{elem.name}</li>
										</div>
									);
								})
							) : (
								<div>No dishes</div>
							)}
						</ul>
					</div>
				</div>

                {/* ¿PARA QUE QUEREMOS BORRAR EL MENU? SIEMPRE TIENE QUE HABER LA CARTA 
                POR LO QUE LO DEJO EN VER EL MENÚ <input type="submit" value="DELETE MENU" /> */}
                </form>
                </div>
                
                )}) : <h1>Loading the menu...</h1>}

				{/*  FINALMENTE LO HEMOS QUITADO POR MOTIVOS DE PRESENTACIÓN (QUEDABA MEJOR 4 CATEGORÍAS)
        
                <h5>Appetizers</h5>
				 <ul>
                    {allDishes.length > 0 ? allDishes.filter(appetizers => appetizers.typeItem === 'Appetizers').map((elem,index)  => {
                        
                        
                            return (
                                <div>
                                   <li key={index}>{elem.name}</li> 
                                </div>
                                )
                        
                    }) : <div>No dishes</div> }
                </ul> */}
				
		</div>
		</div>
	);
};

export default withAuth(MenuAdmin);
