import React, {useState, useEffect} from 'react';
import './Friends.css';
import ListOfFriends from '../ListOfFriends/ListOfFriends'
import ListOfUsers from '../ListOfUsers/ListOfUsers'
import Scroll from  '../Scroll/Scroll'
import { UserContext } from '../../App.js'

function Friends  ({friends,isEnter,currentServer}) {
	const [friendsRoute, setFriendsRoute] = useState('friends')
	const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const user = React.useContext(UserContext)

  console.log(user)
  const popUser = (id) => {
    console.log(id)
    const updatedUsers = users.filter(user =>{
      return user.id != id;
    })
    setUsers(updatedUsers)
  }

	const changeFriendsRoute = (route) => {
		setFriendsRoute(route)
	}
	const onInputChange = (event) =>{
    setInput(event.target.value)
  }

  const filteredUsers = users.filter(user =>{
  	if(user.name.includes(input.toLowerCase())|| user.email.split('@')[0].includes(input.toLowerCase())){
  		return user
  	}
  })

  const filteredFriends = friends.filter(friend =>{
  	if(friend.name.includes(input.toLowerCase()) ||friend.email.split('@')[0].includes(input.toLowerCase())){
  		return friend
  	}
  }) 

  useEffect(() =>{
    fetch(`${currentServer}/users/${user.id}`,{
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(users => setUsers(users))
  },[])

  let routes = 
  friendsRoute === 'friends' 
  ? <Scroll><ListOfFriends user={user} input={input} currentServer={currentServer} isEnter={isEnter} route={friendsRoute} changeFriendsRoute={changeFriendsRoute} friends={filteredFriends} /></Scroll> 
  : (friendsRoute === 'addfriend' ? <ListOfUsers users={users} user={user} popUser={popUser} route={friendsRoute} changeFriendsRoute={changeFriendsRoute}  />:<h1>yope</h1>)

	return(
	<div className="ba w-25 container center h-75">
			<input onChange={onInputChange}className="w-50 friendsearch" type="text" />
		{routes}
	</div>
	)
}

export default Friends