import React, {useState} from 'react';
import ProfilePictureCards from '../ProfilePictureCards/ProfilePictureCards';
import './RegisterProfilePicture.css';






function RegisterProfilePicture (props) {
	
	const array= [];
			for (let i = 0; i < 10; i++){
			array.push(<ProfilePictureCards setProfilePicture={props.setProfilePicture} random={Math.random().toString().substr(2, 5)}/>)
		}
	const [profilePictures, setProfilePictures] = useState([array])

	const refreshProfiles = () => {
		const newArray = []
		 	for (let i = 0; i < 10; i++){
			newArray.push(<ProfilePictureCards setProfilePicture={props.setProfilePicture} random={Math.random().toString().substr(2, 5)}/>)
		}
		setProfilePictures(newArray)
	}




	return(
		<div className="RegisterPfp">
			<h1 className="h1RegisterPfp center">Who are you?</h1>
			{profilePictures}
			<button onClick={refreshProfiles} className="refreshButton center b ph3 pv2 ba b--black grow pointer f5">Refresh List</button>
		</div>

	);
}

export default RegisterProfilePicture