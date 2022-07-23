import React,{useState,useEffect} from 'react';
import FriendsListCard from '../FriendsListCard/FriendsListCard'
import MessageFriend from '../MessageFriend/MessageFriend'



function ListOfFriends  ({input,changeFriendsRoute,route,isEnter,currentServer,user}) {
	const [friends,setFriends] = useState([])
	const [isMessaging, setIsMessaging] = useState(false)
	const [friendMessaged, setFriendMessaged] = useState({})

	const messaging = () => {
		setIsMessaging(true)
	}	
	console.log(input)

	useEffect(()=> {
    fetch(`${currentServer}/${user.id}/friends`,{
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(users => setFriends(users))
	},[])

	const filteredFriends = friends.filter(friend =>{
		console.log(friend)
  	if(friend.name.includes(input.toLowerCase()) ||friend.email.split('@')[0].includes(input.toLowerCase())){
  		return friend
  	}
  }) 
	const list = filteredFriends.map(friend => <FriendsListCard messaging={messaging} route={route} email={friend.email} name={friend.name} entries={friend.entries}/> )




	if (isMessaging){
		return(<MessageFriend isEnter={isEnter}/>)
	}
	else {
		return(
		<div>
			<p onClick={()=>changeFriendsRoute("addfriend")} className="pointer w-25">+Add Friends</p>
			{list}

		</div>
		)		
	}
}

export default ListOfFriends