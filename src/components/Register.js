import React from 'react';
import './../style/register.css';

export default class LogIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			userName: "",
			password1: "",
			password2: "",
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render(){
		const click = this.props.onClick;
		const view = this.props.view;
		return(
			<form action='/register' method='post' onChange={this.handleChange}>
				<span>First Name: </span>
				<input type='text' name="firstName" /><br />
				<span>Last Name: </span>
				<input type='text' name="lastName" /><br />
				<span>Email Address: </span>
				<input type='text' name="email" /><br />
				<span>User Name: </span>
				<input type='text' name="userName" /><br />
				<span>Password: </span>
				<input type='password' name="password1" /><br />
				<span>Repeat Password: </span>
				<input type='password' name="password2" /><br /><br />
				<input type='submit' value="Register" onClick={click}/>
			</form>
		);
	}
}