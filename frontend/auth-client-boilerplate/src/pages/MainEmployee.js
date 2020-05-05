import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import NavbarEm from '../components/global/NavbarEm'


const MainEmployee = () => {

    const [ , setNumber ] = useState('') //Se puede omitir en Hooks la variable del state??

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/menu')
    }    

    return (
        <div>
        <NavbarEm/>
        <div className="d-block text-center my-auto">
            <div className="my-5 d-flex flex-column align-items-center justify-content-center align-content-center w-100 h-100" style={{margin: "auto auto"}}>
                <h1>Please, introduce the number of this table:</h1>
                 <div className="tableBG">
                    <input  onChange={e=>setNumber(e.target.value)} name="number" type="number" min="1" style={{paddingLeft: "2.5rem", height: "2em", fontSize: "60px", maxWidth: "7.5rem"}}/> 
                </div> 
                <button className="acceptTableNumber" onClick={e=>handleClick(e)}>ACCEPT</button>  
            </div>
        </div>
        </div>
    )
}

export default MainEmployee