import React, { Component } from 'react'
import { withAuth } from '../../../context/AuthProvider'
import menus_service from "../../../api/menus-service";
import dishes_service from "../../../api/dishes-service";

 class AddMenu2 extends Component {

    state = {
        name: '',
        dishes: [],
        allDishes: []
    }


    componentDidMount() {
       this.getAllDishes()
    }
    
    getAllDishes = async () => {
       const allTheDishes = await dishes_service.getAllDishes()
        this.setState({allDishes: allTheDishes})
    }



	handleSubmit = async (e) => {
        e.preventDefault();
        const {name, dishes }= this.state
        const newMenu = { name, dishes }
        try {
            await menus_service.saveNewMenu(newMenu)
            console.log({ message: 'New menu created successfully!' })
                
        } catch (error) {
            console.log(error)
        }
    };
    



    render() {
        return(
    
            <div className="d-block w-100 text-center">
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={(e) => this.handleSubmit(e)} >
                
                {/* NAME OF THE MENU */}
				<label>Name of the menu:</label>
				<input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e.target.value)} />

                {/* AQUÍ FALTA TODO LO DE LOS DISHES */}
                <ul>
                    {this.state.allDishes.map((elem,index) => {
                        return (
                            <React.Fragment key={index}>
                                <li key={index}>{elem.name}</li>
                            </React.Fragment>
                            )
                    })}
                </ul>



                <input type="submit" value="ADD NEW MENU" />
			</form>
		</div>
        
         ) }
}

export default withAuth(AddMenu2)