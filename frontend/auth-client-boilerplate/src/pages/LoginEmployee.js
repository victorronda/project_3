import React from 'react'
import { Link } from 'react-router-dom'
import NavbarEm from '../components/global/NavbarEm'

const LoginEmployee = () => {

    return (
        <div>
        <NavbarEm/>
        <div className="pageEm">
            <div className="formuEmplo">
                <div className="">
                    <h4 className="titleEm">Login Employee</h4>
                </div>
                <form>
                    <div className="labelsEm">
                        <label><b>Name</b></label>
                    </div>
                    <div className="">
                        <input className="inputs"
                        type='text'
                        name='name'
                        required
                        />
                    </div>
                    <div className="labelsEm">
                        <label><b>Password</b></label>
                    </div>
                    <div className="">
                        <input className="inputs"
                        type='password'
                        name='password'
                        required
                        />
                    </div>
                    <div className="container-button-log-em">
                        <Link style={{textDecoration: "none", color: "black"}} className="btn-login-em" to='/main/employee'>Access</Link>
                    </div>
                </form>
            </div>
            <div className="mt-3">
                <Link style={{textDecoration: "none"}} className="linksB" to={"/admin/login"}>If you are the Admin, click here</Link>
            </div>
        </div>
        </div>
    )
}

export default LoginEmployee