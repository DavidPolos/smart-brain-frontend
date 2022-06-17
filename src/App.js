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


class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

   isEnter = (keyPress) => {
   return keyPress.key === "Enter";
  }

  resetFailedSignIn = () => {
    this.setState({failedSignIn: false});
  }
//fetch('https://salty-caverns-97227.herokuapp.com/register',
  onSubmitRegister = (email, password, name) => {
      fetch('https://salty-caverns-97227.herokuapp.com/register',{
        credentials: 'include',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      .then(response => response.json())
      .then(user =>{
        if (user.id){
          this.loadUser(user);
          this.onRouteChange('home');
        }else{
          this.setState({failedSignIn: true})
        }
      })
    }





//on deployment dont forget fetch('https://salty-caverns-97227.herokuapp.com/signin',
  onSubmitSignIn = (email, password) => {
    fetch('https://salty-caverns-97227.herokuapp.com/signin',{
      credentials: 'include',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(user =>{
      if (user.id){
        this.loadUser(user);        
        this.onRouteChange('home');

      }else{
        this.setState({failedSignIn: true})
      }
    })
    
  }

  enterSubmitRegister = (keyPress, email, password, name) => {
    if (this.isEnter(keyPress)){
      this.onSubmitRegister(email,password,name);
    }
  }
  enterSubmitSignIn = (keyPress, email, password) => {
    if (this.isEnter(keyPress)){
      this.onSubmitSignIn(email, password); 
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
    }})
  }

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

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
       fetch('https://salty-caverns-97227.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response =>{
        if (response){
          fetch('https://salty-caverns-97227.herokuapp.com/image',{
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

  ImageLinkFormEnterSubmit = (keyPress) =>{
    if (keyPress.key === "Enter"){
      this.onButtonSubmit();     
    }
  }

  //Deletes session on signout
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
      fetch('https://salty-caverns-97227.herokuapp.com/signout',{
        credentials: 'include',
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'
      }
    })
      route = 'signin'
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
          <Session isSignedIn={isSignedIn} loadUser={this.loadUser} onRouteChange={this.onRouteChange} >
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
