import React,{useEffect} from 'react';


function Messages  ({ arrayOfMessages }) {


	let allMessages = arrayOfMessages.map(message => <p>{message}</p>)

	return(
	<div>
		{allMessages}
	</div>
	)
}

export default Messages