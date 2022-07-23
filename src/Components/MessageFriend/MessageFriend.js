import React,{useState,useEffect} from 'react';
import Messages from '../Messages/Messages'
import Scroll from  '../Scroll/Scroll'

function MessageFriend  ({isEnter}) {
	const [arrayOfMessages, setArrayOfMessages] = useState([])
	const [inputValue, setInputValue] = useState('')

	const anArrayOfMessages = ["blablablabla","olbolbolb"]

	const sendMessage = (event) => {
		if(isEnter(event)){
			setArrayOfMessages(oldArray => [...oldArray,event.target.value])
			setInputValue('')
		}
	}
	const handleMessage = (event) => {
		setInputValue(event.target.value)
	}

	useEffect(() => {
		setArrayOfMessages(anArrayOfMessages)

	},[])

	return(
	<div>
		<Scroll>
			<Messages arrayOfMessages={arrayOfMessages} />
		</Scroll>
 		<input value={inputValue} id="messageInput" onChange={handleMessage} onKeyPress={sendMessage} type="text" />
	</div>
	)
}

export default MessageFriend