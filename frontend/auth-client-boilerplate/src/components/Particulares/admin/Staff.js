import React, { useState, useEffect } from 'react'
import { withAuth } from '../../../context/AuthProvider'
import employees_service from "../../../api/employees-service"
import { Link, useHistory } from 'react-router-dom'

const Staff = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [allEmployees, setAllEmployees] = useState([])
    
    const history = useHistory();

    const handleFormSubmit = (e) => {
        e.preventDefault()
        props.addEmployee({name, password})
        setMessage('Employee created successfully!')
        setName("")
        setPassword("")
    }

	const deleteEmployees = async (e) => {
        e.preventDefault();
        try {
            await employees_service.deleteEmployee(e)
            console.log({ message: 'Employee deleted!' })
            history.push('/staff')          
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setAllEmployees(getAllEmployees())
    },[] );
    
    const getAllEmployees = async () => {
       const allTheEmployees = await employees_service.getAllEmployees()
       setAllEmployees(allTheEmployees)
    }

    /* PREGUNTAR!!!    useEffect(() => {
    const timerMessage = setTimeout(setMessage(""), 1000);
    return () => clearTimeout(timerMessage);
  }, []); */

    return (
        <div className="page">
                <div className="cont formu">
                    <div className="contOrders">
                        <h2 className="title">Add Employee</h2>
                    </div>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="labels">
                            <label><h4>Name</h4></label>
                        </div>
                        <div className="contOrders">
                            <input className="inputs" 
                                type='text'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="labels">
                            <label><h4>Password</h4></label>
                        </div>
                        <div className="contOrders">
                            <input className="inputs"
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="center">
                        {message}
                        </div>
                        <div className="contOrders put">
                            <input className="btn-login" type='submit' value='Submit' />
                        </div>
                    </form>
                </div>
            <div className="cont2">
                <div className="contOrders">
                    <h2 className="">My employees</h2>
                </div>
                <div className="enum">
                    
                <ul>
                { allEmployees.length > 0 ? allEmployees.map((employee, i) => {
                    return(
                        <React.Fragment key={i}>
                            <li key={i}> {employee.name} </li> {/* En este map solo nos llega el primero aunque están todos */}
                        </React.Fragment> 
                )
                }) : <div>No employees</div>}                 
                </ul>
                    <ul>
                        { allEmployees.length > 0 ? allEmployees.map((employee, i) => {
                        return(
                            <div>
                                <li key={i}> {employee[i].name} <button className="btn btn-secondary" onClick={(e) => deleteEmployees(e)}>Delete</button></li>
                                
                            </div> 
                          )
                         }) : <div>No employees</div>}                 
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withAuth(Staff)

