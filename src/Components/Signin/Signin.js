import React from 'react';
import './Signin.css';

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			signInEmail:'',
			signInPassword:''
		}
	}

	onEmailChange = (event) => {

		this.setState({signInEmail: event.target.value.toLowerCase()})
		if(this.props.failedSignIn){
			this.props.resetFailedSignIn();
		}

	}
	onPasswordChange = (event) => {
 		this.setState({signInPassword: event.target.value.toLowerCase()})
		if(this.props.failedSignIn){
			this.props.resetFailedSignIn();
		}
	}



	render(){
		const rejectedSignIn = () => {
			if (failedSignIn){
				return (<p className="f6 red db fw9">Wrong Email or Password</p>)
			}
		}
		const enterSignIn = (event) => enterSubmitSignIn(event, signInEmail, signInPassword)
		const { signInEmail, signInPassword } = this.state;
		const {onRouteChange, enterSubmitSignIn, onSubmitSignIn,failedSignIn} = this.props;		
		return(

				
			<article className="test br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0 nowrap">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onKeyPress={enterSignIn} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onKeyPress={enterSignIn} onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={ () => onSubmitSignIn(signInEmail, signInPassword)}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
				      {rejectedSignIn()}
				    </div>
				  </div>
				</main>
			</article>
		);		
	}
}

export default Signin

/*<p className="f6 link dim red db fw9 pointer">that username is already taken</p>*/