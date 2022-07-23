import React from 'react';
import './UserProfilePicture.css';

const UserProfilePicture = ({profilePicture}) => {

	return(

			<div className="center">
				<img className="profilePicture" src={`https://robohash.org/${profilePicture}`} />
			</div>		
	);
}

export default UserProfilePicture