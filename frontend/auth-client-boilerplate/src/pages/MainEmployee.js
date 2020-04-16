import React, { useState } from 'react'
import { withAuth } from '../context/AuthProvider'
import { useHistory } from "react-router-dom"
import tables_service from '../api/tables-service'
import NavbarEm from '../components/global/NavbarEm'


const MainEmployee = () => {
    const [ number, setNumber] = useState('0')
    const [ tables, setTables] = useState('')

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
        history.push('/menu')
    }    

    const editNumberTable = async (e) => {
        e.preventDefault()
        const number = e.target.value
        console.log("target", e.target.value)
        const _id = "5e9799d362d4e429495545de"
        try {
            await tables_service.editTheNumberOfTheTable(_id, {number})
            console.log("numbertablee", number)
            setTables(tables)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
        <NavbarEm/>
        <div className="d-block text-center my-auto">
            <div className="my-5 d-flex flex-column align-items-center justify-content-center align-content-center w-100 h-100" style={{margin: "auto auto"}}>
                <h1>Please, introduce the number of this table:</h1>
                 <div className="tableBG">
                    <input  onChange={(e)=>setNumber(e.target.value)} name="number" type="number" min="0" style={{paddingLeft: "2.5rem", height: "2em", fontSize: "60px", maxWidth: "7.5rem"}}/> 
                </div> 
                <button className="acceptTableNumber" onClick={e=>editNumberTable(e)}>ACCEPT</button>  
            </div>
        </div>
        </div>
    )
}

export default withAuth(MainEmployee)
