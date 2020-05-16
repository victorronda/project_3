import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import employees_service from '../api/employees-service'
import NavbarEm from '../components/global/NavbarEm'


const MainEmployee = () => {
    
    const [ number, setNumber ] = useState('')
    const history = useHistory();

    const editNumberTable = async (e) => {
        e.preventDefault()
        const numberTable = Number(number)
        console.log("numbertable", numberTable)

        try {
            console.log('Llego aqui')
            const table = await employees_service.getTable({params: {body: numberTable}})

            history.push("/menu", {table: table})
        } catch (error) {
            console.log('Hay un error: ', error)
        }
    }

    return (
        <div>
        <NavbarEm/>
        <div className="d-block text-center my-auto">
            <div className="my-5 d-flex flex-column align-items-center justify-content-center align-content-center w-100 h-100" style={{margin: "auto auto"}}>
                <h1>Please, introduce the number of this table:</h1>
                 <form className="tableBG" onSubmit={e=>editNumberTable(e)}>
                    <input  onChange={(e)=>setNumber(e.target.value)} value={number} name="number" type="number" min="0" style={{paddingLeft: "2.5rem", height: "2em", fontSize: "60px", maxWidth: "7.5rem"}}/> 
                <button className="acceptTableNumber" type="submit">ACCEPT</button>  
                </form> 
            </div>
        </div>
        </div>
    )
}

export default MainEmployee