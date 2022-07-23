import React from 'react';



const ProfilePictureCards = ({random, setProfilePicture}) => {
	return(
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
			<img onClick={() => setProfilePicture(random)} src={`https://robohash.org/${random}?200x200`}/>
		</div>

	);
}

export default ProfilePictureCards