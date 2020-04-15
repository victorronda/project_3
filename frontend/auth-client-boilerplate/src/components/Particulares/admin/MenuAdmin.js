import React, { useState, useEffect } from 'react';
import { withAuth } from '../../../context/AuthProvider';
import menus_service from '../../../api/menus-service';
import dishes_service from '../../../api/dishes-service'; /* ME HE QUEDADO POR AQUÍ, falta añadir la ruta de get all dishes para 
listarlos en el form del menú */

import { useHistory } from 'react-router-dom';

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

	const handleSubmitDeleteMenu = async (e) => {
		e.preventDefault();
		const newMenu = { dishes };
		try {
			await menus_service.saveNewMenu(newMenu);
			console.log({ message: 'New menu created successfully!' });
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
		<div className="d-flex flex-row w-100 text-center mh-100" >
            <div className="card d-flex justify-content-center align-items-center text-center mx-auto w-50" style={{margin: "4rem 0"}}>

            
			<form
                className="card-body w-100"
				onSubmit={(e) => handleSubmitDeleteMenu(e)}
			>
				{/* NAME OF MY MENU */}

				{myMenu.length > 0 ? (
					myMenu.map((menu, i) => <h1 className="w-100 mx-2" key={i}>{menu.name}</h1>)
				) : (
					<h1>YOU DO NOT HAVE A MENU CREATED</h1>
				)}

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
				<div className="d-flex flex-row justify-content-between w-100">
					<div className="card-item col-6">
						<h5>Entree</h5>
						<ul>
							{allDishes.length > 0 ? (
								allDishes.filter((entree) => entree.typeItem === 'Entree').map((elem, index) => {
									return (
										<div>
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
											<div>
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
										<div>
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
										<div>
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

				<input type="submit" value="DELETE MENU" />
			</form>
            </div>
		</div>
	);
};

export default withAuth(MenuAdmin);
