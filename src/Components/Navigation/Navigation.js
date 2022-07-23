import React from 'react';
import './Nav.css';

const Navigation = ({ onRouteChange, isSignedIn, resetFailedSignIn,route }) => {
		if (isSignedIn){
		return(
			<div>
				<nav className="signout" >
					{ route === "friendlist" 
					? 
					<p onClick={() => onRouteChange('home')} className="link dim black underline pa3 pointer">Home</p>
					:
					<p onClick={() => onRouteChange('friendlist')} className="link dim black underline pa3 pointer">Friends</p>
					}
					<p onClick={() => onRouteChange('profile')} className="link dim black underline pa3 pointer">Profile</p>
					<p onClick={() => onRouteChange('signout')} className=' link dim black underline pa3 pointer'>Sign Out</p>
				</nav>
			</div>
		  );
		}else{
		return(
			<nav style={{display:'flex',justifyContent: 'flex-end'}}>
				<p onClick={() => {onRouteChange('signin');resetFailedSignIn()}} className='f3 link dim black underline pa3 pointer'>Sign In</p>
				<p onClick={() => {onRouteChange('register');resetFailedSignIn()}} className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
		);
		}
}

export default Navigation