import React, { useState } from 'react';
import dishes_service from "../../../api/dishes-service";
import { useHistory } from "react-router-dom"


/* BACKEND ROUTE: POST /dishes/add */

const AddDish = () => {
	const [ name, setName ] = useState('');
    const [ typeItem, setTypeItem ] = useState('Entree');
    const [ ingredientInput, setIngredientInput] = useState('')
    const [ ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState('');
    /* const [image, setImage] = useState('');  *///No lo usamos?? 
    const [price, setPrice] = useState(0);



    const history = useHistory();


	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dishes_service.saveNewDish({ name, typeItem, description, price, ingredients })
            console.log({ message: 'New dish created successfully!' })
            history.push('/profile')          
        } catch (error) {
            console.log(error)
        }
    };
    


    const handleFileUpload = (e) => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
    
        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);
    
        dishes_service
          .handleUpload(uploadData)
          .then((response) => {
            this.setState({ image: response.secure_url });
          })
          .catch((err) => {
            console.log("Error while uploading the file: ", err);
          });
      };


      const addIngredient = (e) => {
          e.preventDefault()
        setIngredients([...ingredients, ingredientInput])
      }




	return (
		<div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={(e) => handleSubmit(e)} >
                
                {/* NAME */}
				<label>Name:</label>
				<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                {/* TYPE */}
                <select value={typeItem} onChange={(e) => setTypeItem(e.target.value)}>
					<option value="Dessert">Dessert</option>
					<option value="Drinks">Drinks</option>
					<option value="Appetizers">Appetizers</option>
					<option value="Entree">Entree</option>
		    		<option value="Second Course">Second Course</option>
				</select>

                {/* INGREDIENTS */}

                


                <ul>
                {ingredients.length > 0 ? ingredients.map((ingredient, index) => {
                    return(
                        <React.Fragment key={index}>
                            <li key={index}>{ingredient}</li>
                        </React.Fragment> 
                )
                }) : <div>No ingredients</div>}                 
                </ul>
                <label>Ingredients:</label>
				<input name="ingredientInput" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
                <button className="d-inline" onClick={(e) => addIngredient(e)}>+</button>
                


                {/* DESCRIPTION */}
                <label>Description:</label>
				<input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                {/* IMAGE */}
                <label htmlFor="image">Image: <span>Upload a </span></label>
                <input name="image" type='file' onChange={(e) => handleFileUpload(e)} />
                {/* Chequear, no usamos image ni set image?? */}


                {/* PRICE */}
                <label>Price:</label>
				<input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />


                <input type="submit" value="ADD NEW DISH" />
			</form>
		</div>
	);
};

export default AddDish;
