import React from 'react';
import './Register.css';


class Register extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			email:'',
			password:'',
			name:''
		}
	}



	onNameChange = (event) => {
		this.setState({name: event.target.value.toLowerCase()})
		if(this.props.failedSignIn){
			this.props.resetFailedSignIn();
		}
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value.toLowerCase()})
		if(this.props.failedSignIn){
			this.props.resetFailedSignIn();
		}

	}
	onPasswordChange = (event) => {
 		this.setState({password: event.target.value.toLowerCase()})
 		if(this.props.failedSignIn){
			this.props.resetFailedSignIn();
		}

	}




	render() {
		const rejectedSignIn = () => {
			if (failedSignIn){
				return (<p className="f6 red db fw9">Name or Email already taken</p>)
			}else{
				return <div></div>
			}
		}
		const enterRegister = (event) => enterSubmitRegister(event, email, password, name)
		const { onSubmitRegister, enterSubmitRegister,failedSignIn } = this.props;
		const { email, password, name} = this.state;
		return(
		<article className="test br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input onKeyPress={enterRegister} onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onKeyPress={enterRegister} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onKeyPress={enterRegister} onChange={this.onPasswordChange}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick={() => onSubmitRegister(email, password, name)}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" />
			    </div>
			    {rejectedSignIn()}
			  </div>
			</main>
		</article>
	);	
	}

}

export default Register