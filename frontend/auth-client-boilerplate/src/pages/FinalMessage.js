import React from 'react'
import { withAuth } from '../context/AuthProvider'
import iconChef from '../images/icono-chef2.jpg'
import NavbarEm from '../components/global/NavbarEm'

const FinalMessage = () => {
    return (
        <div>
        <NavbarEm/>
        <div className="row mw-100">
          <div className="col-lg-5" style={{fontSize: "170px", color: "#53E2AF", fontWeight: "bolder", margin: "12% 10% 0 10%"}}>
              <h1><b>Thank you!</b></h1>
              <h1><b>Your food is on its way!</b></h1>
          </div>
          <div className="col-lg-3">
                <img src={iconChef} style={{maxWidth: "15rem", maxHeight: "15rem", margin: "27% 0% 27% 0"}} alt="chef"/>
          </div>

        </div>
        </div>
    )
}

export default withAuth(FinalMessage)
