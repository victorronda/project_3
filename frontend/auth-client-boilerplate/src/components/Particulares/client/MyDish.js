import React, { useState } from 'react'

const MyDish = (props) => {

    const [ quantityDish, setQuantityDish ] = useState(0)

    return (
		<div className="mx-4">
			<ul>
				<li  className="d-flex flex-row ">
					{/* nombre plato */}
					<div className="col-sm-6">
						<p>{props.name}</p>
					</div>

					{/* precio plato */}
					<div className="col-sm-3">
						<span name="price">
							{props.price.toFixed(2)}
							<span>€</span>
						</span>
					</div>

					{/* cantidad */}
					<div className="col-sm-2">
						<input
							style={{ display: 'inline', width: '2rem' }}
							min="0"
							type="number"
							name={props._id}
							onChange={(e) => setQuantityDish(e.target.value)}
							value={quantityDish}
						/>
					</div>
					{/* botones añadir */}
					<div className="col-sm-1">
						<button
							className="d-inline"
							name={props._id}
							onClick={()=>props.clicked({_id: props._id, name: props.name, price:props.price, quantity: Number(quantityDish) })}
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
							+
						</button>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default MyDish