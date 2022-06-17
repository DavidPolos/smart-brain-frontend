import React, {useEffect} from 'react';



function Session(props) {

/*
() => {
		fetch('https://salty-caverns-97227.herokuapp.com/')
		.then(response => response.json())
      	.then(user =>{
      		if (user.id){
      			props.loadUser(user);
      			props.onRouteChange('home');
      		}
      	})
      }
*/


	const isSession = () =>{
		fetch('https://salty-caverns-97227.herokuapp.com/',{
		withCredentials: true,
		credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
      })
		.then(response => {
			return response.json()
		})
		.then(user =>{
			if (user.id){
				props.loadUser(user);
				props.onRouteChange('home');
			}
		})
	}
      isSession()
	if (!props.isSignedIn){
		return(
			<div >
				{props.children}
			</div>
		)
	}
}

export default Session;