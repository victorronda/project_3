import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '../context/AuthProvider'

const Pay = () => {


    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center text-center align-content-center align-items-center"  >
            <div className="card w-25 align-items-center" style={{backgroundColor: "#C5EBCF", margin: "2%"}}>
                <div className="card-body text-center w-100">
                    <h2>My order</h2><br/>
                    <button style={{background: "#45B1EE", color: "white", fontSize: "30px", padding: "1% 20%", borderRadius: "10px", boxShadow: "0.5px 0.5px rgba(51, 184, 192,.53)"}}>Cash</button><br/><br/>
                    <button style={{background: "#45B1EE", color: "white", fontSize: "30px", padding: "1% 20%", borderRadius: "10px", boxShadow: "0.5px 0.5px rgba(51, 184, 192,.53)"}}>Card</button><br/><br/>
                    <button style={{background: "#45B1EE", color: "white", fontSize: "30px", padding: "1% 20%", borderRadius: "10px", boxShadow: "0.5px 0.5px rgba(51, 184, 192,.53)"}}>Bitcoin</button><br/><br/>  
                    <p><b>TOTAL: {/* AQUÍ IRÍA EL TOTAL */}</b></p>
                </div>    
            </div>
            <div className="d-flex flex-row justify-content-around" style={{textDecoration: "none"}}>
                <Link className="payButton" style={{textDecoration: "none", margin: "0 20px"}}>PAY</Link>
                <Link className="cancelPayButton" style={{textDecoration: "none", margin: "0 20px"}}>CANCEL</Link>
            </div>
            
        </div>
    )
}

export default withAuth(Pay);
