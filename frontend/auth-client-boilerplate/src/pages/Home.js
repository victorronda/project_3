import React from 'react';
import { withAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import NavbarEm from '../components/global/NavbarEm';

const Home = () => {
	const mainStyle = {
		margin: '26vh auto'
    };
    
    const titleStyle = {
        fontSize: '9vw'
    }


	return (
		<div>
			<NavbarEm />
			<div className="d-block text-center align-content-center " style={mainStyle}>
				<div>
					<h1 style={titleStyle}>MGBITE</h1>
				</div>
				<div className="mt-5">
					<Link style={{textDecoration: 'none' }} className="px-5 py-2 my-5 signupButton" to="/signup">
					<b>Sign up</b>	
					</Link>
					<br />
				</div>

				<div className="mt-5">
					<p className="d-inline mr-3" style={{ fontSize: '0.8vw' }}>
						<b>Already registered?</b>
					</p>
					<Link style={{textDecoration: 'none'}} className="linksB" to="/employees/login">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default withAuth(Home);
