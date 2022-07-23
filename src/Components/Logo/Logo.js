import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
	return(
		<div className="logoDiv mt0">
		    <Tilt style={{height:'150px',width:'150px'}} className='logo tilt shadow-2'>
		      	<img alt='logo' src={brain} />		      
		    </Tilt>
		</div>
	);
}

export default Logo