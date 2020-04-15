import React, { useState, useEffect } from 'react';
import menus_service from '../../../api/menus-service';
import dishes_service from '../../../api/dishes-service'; /* ME HE QUEDADO POR AQUÍ, falta añadir la ruta de get all dishes para 
listarlos en el form del menú */

import { Link, useHistory } from 'react-router-dom';
import NavbarEm from '../../global/NavbarEm';

/* BACKEND ROUTE: POST /menus/add */

const MenuClient = () => {
	const [ dishes, setDishes ] = useState([]);
	const [ allDishes, setAllDishes ] = useState([]);
	const [ myMenu, setMyMenu ] = useState([]);
	const [ typeItem, setTypeItem ] = useState('Dessert');

	const history = useHistory();

	useEffect(() => {
		getAllDishes();
		getTheMenu();
	}, []);

	const handleSubmitDeleteMenu = async (e, id) => {
		e.preventDefault();
		try {
			await menus_service.deleteMyMenu(id);
			console.log({ message: 'New menu deleted!' });
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
		<NavbarEm/>
		<div
			className="d-flex flex-row w-100 text-center mh-100"
			style={{ backgroundColor: '#81cfca', padding: '10vh' }}
		>
			{/* NAME OF MY MENU */}

			{myMenu.length > 0 ? (
				myMenu.map((menu, i) => {
					return (
						<div
							key={i}
							className="card d-flex justify-content-center align-items-center text-center mx-auto w-50"
							style={{ margin: '4rem 0' }}
						>
							<form
								className="card-body w-100"
								onSubmit={(e) => handleSubmitDeleteMenu(e, myMenu[0]._id)}
								style={{ boxShadow: '1px 1.5px 1.5px 1px #3EC0B8' }}
							>
								<h1 className="w-100 mx-2 mb-5" key={i}>
									{menu.name}
								</h1>
								<div className="d-flex flex-row justify-content-between w-100">
									<div className="card-item col-6">
										<h5>Entree</h5>
										<ul>
											{allDishes.length > 0 ? (
												allDishes
													.filter((entree) => entree.typeItem === 'Entree')
													.map((elem, index) => {
														return (
															<div className="d-flex flex-row" key={index}>
																<div className="col-sm-6">
																	<li key={index}>
																		<Link
																			style={{
																				textDecoration: 'none',
																				color: 'black'
																			}}
																			to={`/dishes/${elem._id}`}
																		>
																			{elem.name}
																		</Link>
																	</li>
																</div>
																<div className="col-sm-3">
																	<span>{elem.price.toFixed(2)}€</span>
																</div>
																<div className="col-sm-2">
																	<input
																		style={{ display: 'inline', width: '2rem' }}
																		min="0"
																		type="number"
																	/>
																</div>
																<div className="col-sm-1">
																	<input type="checkbox" />
																</div>
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
															<div className="d-flex flex-row" key={index}>
																<div className="col-sm-6">
																	<li key={index}>
																		<Link
																			style={{
																				textDecoration: 'none',
																				color: 'black'
																			}}
																			to={`/dishes/${elem._id}`}
																		>
																			{elem.name}
																		</Link>
																	</li>
																</div>
																<div className="col-sm-3">
																	<span>{elem.price.toFixed(2)}€</span>
																</div>
																<div className="col-sm-2">
																	<input
																		style={{ display: 'inline', width: '2rem' }}
																		min="0"
																		type="number"
																	/>
																</div>
																<div className="col-sm-1">
																	<input type="checkbox" />
																</div>
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
												allDishes
													.filter((dessert) => dessert.typeItem === 'Dessert')
													.map((elem, index) => {
														return (
															<div className="d-flex flex-row" key={index}>
																<div className="col-sm-6">
																	<li key={index}>
																		<Link
																			style={{
																				textDecoration: 'none',
																				color: 'black'
																			}}
																			to={`/dishes/${elem._id}`}
																		>
																			{elem.name}
																		</Link>
																	</li>
																</div>
																<div className="col-sm-3">
																	<span>{elem.price.toFixed(2)}€</span>
																</div>
																<div className="col-sm-2">
																	<input
																		style={{ display: 'inline', width: '2rem' }}
																		min="0"
																		type="number"
																	/>
																</div>
																<div className="col-sm-1">
																	<input name="dishes[]" type="checkbox" />
																</div>
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
												allDishes
													.filter((drinks) => drinks.typeItem === 'Drinks')
													.map((elem, index) => {
														return (
															<div className="d-flex flex-row" key={index}>
																<div className="col-sm-6">
																	<li key={index}>
																		<Link
																			style={{
																				textDecoration: 'none',
																				color: 'black'
																			}}
																			to={`/dishes/${elem._id}`}
																		>
																			{elem.name}
																		</Link>
																	</li>
																</div>
																<div className="col-sm-3">
																	<span>{elem.price.toFixed(2)}€</span>
																</div>
																<div className="col-sm-2">
																	<input
																		style={{ display: 'inline', width: '2rem' }}
																		min="0"
																		type="number"
																	/>
																</div>
																<div className="col-sm-1">
																	<input type="checkbox" />
																</div>
															</div>
														);
													})
											) : (
												<div>No dishes</div>
											)}
										</ul>
									</div>
								</div>
							</form>
						</div>
					);
				})
			) : (
				<h1>Loading the menu...</h1>
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

			<div style={{ marginTop: "4rem"}}>
				{dishes.length > 0 ? (
					<div className="card">
						<div>
							<h1>MY ORDER</h1>
						</div>
					</div>
				) : (
					<div className="" style={{ }}>
						<h1 style={{backgroundColor: 'white', padding: '2rem', boxShadow: '1px 1.5px 1.5px 1px #3EC0B8', borderRadius: "3px" }}>What are you going to order today?</h1>
					</div>
				)}
			</div>
		</div>
		</div>
	);
};

export default MenuClient;
