import React from 'react';
import FriendsListCard from '../FriendsListCard/FriendsListCard'



const ListOfFriends = ({users,changeFriendsRoute,route,popUser}) => {

	const list = users.map(user => <FriendsListCard popUser={popUser} {...user}/> )

	return(
	<div>
		<p onClick={()=>changeFriendsRoute("friends")} className="pointer w-25">Friends</p>
		{list}
	</div>
	)
}

export default ListOfFriends