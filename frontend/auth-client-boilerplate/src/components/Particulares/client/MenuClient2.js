import React, { useState, useEffect } from 'react';
import menus_service from '../../../api/menus-service';
import dishes_service from '../../../api/dishes-service';
import Modal from 'react-modal';
import ConfirmOrder from './ConfirmOrder';
import "./confirmationModal.css"

import { Link, useHistory } from 'react-router-dom';
import NavbarEm from '../../global/NavbarEm';
import MyDish from './MyDish';

/* BACKEND ROUTE: POST /menus/add */

const MenuClient2 = () => {
	const [ dishes, setDishes ] = useState([]);
	const [ allDishes, setAllDishes ] = useState([]);
	const [ myMenu, setMyMenu ] = useState([]);
	const [ showModal, setShowModal ] = useState(false);

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

	const handleClickAdd = (newDish) => {
		setDishes([ ...dishes, newDish ]);
	};

	const handleDeleteClick = (dishId) => {
		console.log('Dish ID:', dishId);
		const theDish = [ ...dishes ];
		console.log('theDish:', theDish);
		const dishFiltered = theDish.filter((dish) => dish._id !== dishId);
		console.log('theDish:', dishFiltered);
		setDishes(dishFiltered);
	};

	const totalPrice = () => {
		let total = 0;
		for (let i = 0; i < dishes.length; i++) {
			total += dishes[i].price * dishes[i].quantity;
		}
		return total;
	};

	return (
		<div >
			<NavbarEm />
			<div
				className="d-flex flex-row w-100 text-center"
				style={{ backgroundColor: '#81cfca', padding: '2vh 8vh' }}
			>
				{/* NAME OF MY MENU */}

				{myMenu.length > 0 ? (
					myMenu.map((menu, i) => {
						return (
							<div
								key={i}
								className="col-8 card d-flex justify-content-center align-items-center text-center w-75"
								style={{ margin: '4rem 0' }}
							>
								{/* principio*/}
								<div className="card-body w-100" style={{ boxShadow: '1px 1.5px 1.5px 1px #3EC0B8' }}>
									{/* nombre menu */}
									<h1 className="w-100 mx-2 mb-5" key={i}>
										{menu.name}
									</h1>
									<div className="d-flex flex-row justify-content-between w-100">
										<div className="card-item col-6 w-100">
											{/* nombre categoría plato */}
											<h5>Entree</h5>
											<div className="myOverflow">
												{allDishes.length > 0 ? (
													allDishes
														.filter((entree) => entree.typeItem === 'Entree')
														.map((elem, index) => {
															return (
																<MyDish
																	key={index}
																	name={elem.name}
																	price={elem.price}
																	_id={elem._id}
																	clicked={handleClickAdd}
																/>
															);
														})
												) : null}
											</div>
										</div>

										<div className="card-item col-6 w-100">
											<h5>Second Course</h5>
											<div className="myOverflow">
											{allDishes.length > 0 ? (
												allDishes
													.filter((entree) => entree.typeItem === 'Second Course')
													.map((elem, index) => {
														return (
															<MyDish
																name={elem.name}
																price={elem.price}
																_id={elem._id}
																clicked={handleClickAdd}
															/>
														);
													})
											) : null}
											</div>
										</div>
									</div>

									<div className="row container-fluid">
										<div className="card-item col-6 w-100">
											<h5>Dessert</h5>
											<div className="myOverflow">
											{allDishes.length > 0 ? (
												allDishes
													.filter((entree) => entree.typeItem === 'Dessert')
													.map((elem, index) => {
														return (
															<MyDish
																name={elem.name}
																price={elem.price}
																_id={elem._id}
																clicked={handleClickAdd}
															/>
														);
													})
											) : null}
											</div>
										</div>
										<div className="card-item col-6 w-100">
											<h5>Drinks</h5>
											<div className="myOverflow">
											{allDishes.length > 0 ? (
												allDishes
													.filter((entree) => entree.typeItem === 'Drinks')
													.map((elem, index) => {
														return (
															<MyDish
																name={elem.name}
																price={elem.price}
																_id={elem._id}
																clicked={handleClickAdd}
															/>
														);
													})
											) : null}
											</div>
										</div>
									</div>
								</div>
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

				<div className="col-4" style={{ marginTop: '4rem' }}>
					{dishes.length > 0 ? (
						<div className="card">
							<div className="card-header">
								<h1>MY ORDER</h1>
							</div>
							{dishes.map((eachDish, index) => {
								return (
									<div key={index} className="card-body">
										<h5>{eachDish.name}</h5>
										<div>
											<p>
												<span>{eachDish.quantity} un.</span>
												<span>{eachDish.price}€</span>
											</p>
										</div>
										<button
											className="d-inline"
											onClick={() => handleDeleteClick(eachDish._id)}
											style={{
												fontSize: '15px',
												width: '1.5rem',
												height: '1.5rem',
												borderRadius: '90px',
												backgroundColor: '#EEEEEE',
												color: '#3EC0B8',
												marginLeft: '0.4rem'
											}}
										>
											-
										</button>
									</div>
								);
							})}
							<div className="card-header">
								<h1>TOTAL PRICE:</h1>
								<h5>{totalPrice()}€</h5>
							</div>
							<button onClick={() => setShowModal(!showModal)}>CONFIRM ORDER</button>
						</div>
					) : (
						<div className="" style={{}}>
							<h1
								style={{
									backgroundColor: 'white',
									padding: '2rem',
									boxShadow: '1px 1.5px 1.5px 1px #3EC0B8',
									borderRadius: '3px'
								}}
							>
								My order...
							</h1>
						</div>
					)}
				</div>
			</div>
			<ConfirmOrder isOpen={showModal} closeModal={() => setShowModal(false)} />
		</div>
	);
};

export default MenuClient2;
