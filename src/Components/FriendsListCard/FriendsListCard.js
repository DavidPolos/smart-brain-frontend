import React,{ useContext } from 'react';
import { UserContext } from '../../App.js'


const devServer = "http://localhost:3001";
const deployServer = "https://salty-caverns-97227.herokuapp.com";
const currentServer = devServer;

function FriendsListCard (props,{route,messaging}){

const user = useContext(UserContext)
	
	const sendFriendRequest = (cfr) => {
		fetch(`${currentServer}/friendrequest/${user.id}/${props.id}`,{
        method: 'post',
        headers: {'Content-Type': 'application/json'}
      }).then(console.log)
	}
	
	return(
	 <div style={{alignItems:'center'}}className="center">
	 	<img style={{height:"100px"}} src={`https://robohash.org/${props.pfp}?100x100`}/>
	 	<p>{props.name}</p>
	 	<p>{props.email}</p>
	 	<p>{props.entries}</p>
	 	{ route === 'friends' || props.route === 'friends' ?
	 	<div>
		 	<p className="pointer">Profile</p>
		 	<p onClick={messaging} className="pointer">Message</p>
	 	</div>
	 	:<p onClick={() => {sendFriendRequest(); props.popUser(props.id)}} className="pointer">Send Friend Request</p>
	 	}
	 </div>


	)
}

export default FriendsListCard
