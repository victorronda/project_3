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
                    <h2 className="titleEm">Login Employee</h2>
                </div>
                <form>
                    <div className="labelsEm">
                        <label><h4>Name</h4></label>
                    </div>
                    <div className="">
                        <input className="inputs"
                        type='text'
                        name='name'
                        required
                        />
                    </div>
                    <div className="labelsEm">
                        <label><h4>Password</h4></label>
                    </div>
                    <div className="">
                        <input className="inputs"
                        type='password'
                        name='password'
                        required
                        />
                    </div>
                    <div className="">
                        <Link style={{textDecoration: "none"}} className="btn-login" to='/main/employee'>Access</Link>
                    </div>
                </form>
            </div>
            <div>
                <Link style={{textDecoration: "none"}} className="linksB" to={"/admin/login"}>If you are the Admin, click here</Link>
            </div>
        </div>
        </div>
    )
}

export default LoginEmployee
