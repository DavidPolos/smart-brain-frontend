import React, {useEffect} from 'react';



function Session(props) {


	useEffect(()=>{
		props.isThereSession()
	})
      
	if (!props.isSignedIn){
		return(
			<div >
				{props.children}
			</div>
		)
	}
}

export default Session;