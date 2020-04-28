import React, { useState } from 'react';
import dishes_service from "../../../api/dishes-service";
import { useHistory } from "react-router-dom"
import { withAuth } from '../../../context/AuthProvider'
import Navbar from '../../global/Navbar';


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

      const deleteIngredient = (e) => {
        e.preventDefault()
          ingredients.pop();
          setIngredients([...ingredients])
      }




	return (
        <div>
        <Navbar/>
		<div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center addDishForm" onSubmit={(e) => handleSubmit(e)} >
                
                {/* NAME */}
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                {/* TYPE */}
                <div>
                <span>Type</span>    
                <select value={typeItem} onChange={(e) => setTypeItem(e.target.value)}>
					<option value="Dessert">Dessert</option>
					<option value="Drinks">Drinks</option>
					<option value="Appetizers">Appetizers</option>
					<option value="Entree">Entree</option>
		    		<option value="Second Course">Second Course</option>
				</select>
                </div>

                {/* INGREDIENTS */}
                <div className="d-flex flex-row justify-content-center w-100 text-center mx-auto">
                    <ul className="showIngredients" >
                    {ingredients.length > 0 ? ingredients.map((ingredient, index) => {
                        return(
                            <React.Fragment key={index}>
                                <li className="px-2" key={index}>{ingredient}</li>
                            </React.Fragment> 
                    )
                    }) : <div style={{right: "50%", top: "50%", transform: "translate(20%,-50%)"}}>No ingredients</div>}                 
                    </ul>
                </div>
                 <div>
                    <label>Ingredients:</label>
                    <input name="ingredientInput" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
                    <button className="d-inline" onClick={(e) => addIngredient(e)} style={{width: "1.5rem", height: "1.5rem",borderRadius: "40px", backgroundColor: "#EEEEEE", color: "#3EC0B8", marginLeft: "0.4rem"}}>+</button>           
                    <button className="d-inline" onClick={(e) => deleteIngredient(e)} style={{width: "1.5rem", height: "1.5rem",borderRadius: "40px", backgroundColor: "#EEEEEE", color: "#3EC0B8", marginLeft: "0.4rem"}}>-</button>           
                </div>   
                


                {/* DESCRIPTION */}
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* IMAGE -----> TODO ESTO SERÁ BACKLOG */}
                {/* <div>
                    <label htmlFor="image">Image:</label>
                    <input name="image" type='file' onChange={(e) => handleFileUpload(e)} />             
                </div> */}
                {/* Chequear, no usamos image ni set image?? */}


                {/* PRICE */}
                <div>
                    <label>Price:</label>
                    <input type="number" min="0" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>


                <input style={{backgroundColor: "#3EC0B8", padding: "1rem 4rem", margin: "2rem 1rem", borderRadius: "10px", boxShadow: "1px 1px 1px 1px #3EC0B8"}} type="submit" value="ADD NEW DISH" />
			</form>
		</div>
        </div>
	);
};

export default withAuth(AddDish);
