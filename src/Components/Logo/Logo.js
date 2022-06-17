import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
	return(

		<div className="ma4 mt0">
		    <Tilt style={{height:'150px',width:'150px'}} className='tilt br2 shadow-2'>
		      	<img className="logo" alt='logo' src={brain} />		      
		    </Tilt>
		</div>
	);
}

export default Logo