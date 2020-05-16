import React from 'react';
import MyDish from './MyDish';

const DishType = (props) => {
	console.log('Las props de AllDishes deben ser una array:', props.allDishes);
	return (
		<div>
			<h5>{props.typeItem}</h5>
			<div className="myOverflow">
				{props.allDishes.length > 0 ? (
					props.allDishes.filter((entree) => entree.typeItem === props.typeItem).map((elem, index) => {
						return (
							<React.Fragment>
								<MyDish
									type={elem.name}
									name={elem.name}
									price={elem.price}
									_id={elem._id}
									clicked={props.clicked}
								/>
							</React.Fragment>
						);
					})
				) : null}
			</div>
		</div>
	);
};

export default DishType;