import React,{ Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Session from './Components/Session/Session';

const initialState = {
      input: '',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      failedSignIn:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }

const devServer = "http://localhost:3001";
const deployServer = "https://salty-caverns-97227.herokuapp.com";
const currentServer = devServer;

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }
  //Checks if the user has a session where they were logged in 
  //and logs them in if they did
  isThereSession = () =>{
    this.loadingUserIn(
      fetch(`${currentServer}/`,{
      withCredentials: true,
      credentials: 'include',
          method: 'GET',
          headers: {'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      )
    )
  }
  // is enter?
  isEnter = (keyPress) => {
    return keyPress.key === "Enter";
  }
  //removes failed to signin text
  resetFailedSignIn = () => {
    this.setState({failedSignIn: false});
  }
  //registers user
  onSubmitRegister = (email, password, name) => {
    this.logginUserIn(
      fetch(`${currentServer}/register`,{
        credentials: 'include',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      )
  }
  //Loads user returns true if success false if not a success
  loadingUserIn = (promise) => {
    if(promise.then(response => response.json())
      .then(user =>{
        if (user.id){
          this.loadUser(user);        
          this.onRouteChange('home');
          return true;
        }else{
          return false;
        }
      })
      ){
      return true;
  }else{
    return false;
  }
}
  //Attempts to log in user if cant then notifies user that something went wrong
  loggingUserIn = (promise) =>{
    if(this.loadingUserIn(promise)){
      return;
    }else{
      this.setState({failedSignIn: true})      
    }
  }

  //signs user in
  onSubmitSignIn = (email, password) => {
    this.loggingUserIn(
      fetch(`${currentServer}/signin`,{
      credentials: 'include',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    )
  }
  //registers user on enter click
  enterSubmitRegister = (keyPress, email, password, name) => {
    if (this.isEnter(keyPress)){
      this.onSubmitRegister(email,password,name);
    }
  }
  //signs user in on enter click
  enterSubmitSignIn = (keyPress, email, password) => {
    if (this.isEnter(keyPress)){
      this.onSubmitSignIn(email, password); 
    }
  }
  // loads the user in after login or register
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  //searches for face in image
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  //submits picture to api
  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
       fetch(`${currentServer}/imageurl`,{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response =>{
        if (response){
          fetch(`${currentServer}/image`,{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  //submits on enter press
  ImageLinkFormEnterSubmit = (keyPress) =>{
    if (keyPress.key === "Enter"){
      this.onButtonSubmit();     
    }
  }
  //takes care of different routes
  onRouteChange = (route) => {
    if (route === 'signout'){
      fetch(`${currentServer}/signout`,{
        credentials: 'include',
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'
      }
    })
      .then(route = 'signin')
      .then(this.setState(initialState))
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render() {
    const { isSignedIn, imageUrl, route, box, failedSignIn } = this.state;
    return(
    <div className="App">
      <Navigation
       resetFailedSignIn={this.resetFailedSignIn}
       isSignedIn={isSignedIn} 
       onRouteChange={this.onRouteChange}/>
      { route === 'home' 
        ?<div>
          <Logo />
          <Rank
           name={this.state.user.name} 
           entries={this.state.user.entries} />
          <ImageLinkForm
           ImageLinkFormEnterSubmit={this.ImageLinkFormEnterSubmit} 
           onButtonSubmit={this.onButtonSubmit} 
           onInputChange={this.onInputChange}
           />
          <FaceRecognition
           box={box} 
           imageUrl={imageUrl} 
           />
         </div>
         :(
           this.state.route ==='signin'
          ?
          <Session isSignedIn={isSignedIn} isThereSession={this.isThereSession} >
            <Signin
             resetFailedSignIn={this.resetFailedSignIn}
             failedSignIn={failedSignIn}
             onSubmitSignIn={this.onSubmitSignIn} 
             enterSubmitSignIn={this.enterSubmitSignIn} 
             loadUser={this.loadUser} 
             onRouteChange={this.onRouteChange}
             />
           </Session>
           :<Register
            resetFailedSignIn={this.resetFailedSignIn}
            failedSignIn={failedSignIn}
            onSubmitRegister={this.onSubmitRegister} 
            enterSubmitRegister={this.enterSubmitRegister} 
            loadUser={this.loadUser} 
            onRouteChange={this.onRouteChange}
            />
            )
        }
    </div>
    );
  }
}

export default App;
