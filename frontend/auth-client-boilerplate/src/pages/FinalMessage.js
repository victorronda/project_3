import React, { Component } from 'react'
import iconChef from '../images/icono-chef2.jpg'
import NavbarEm from '../components/global/NavbarEm'
import { Redirect } from 'react-router-dom'

class FinalMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
         showText: false
        }
       }
    
       componentDidMount() {
        setTimeout(() => {
          this.setState({ showText: true })
        }, 5000)
       }

    render() {
        const {showText}=this.state
             return (
                
                    
                !showText ?  <div>
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
            : <Redirect to={'/menu'} />   ) 


             

    }
        
}  


export default FinalMessage


