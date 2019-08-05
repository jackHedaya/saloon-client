import React from 'react';
import './../style/logIn.css';

export default class LogIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userName: "",
			password: "",
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	render(){
		const click = this.props.onClick;
		const view = this.props.view;
		return(
			<form action='/login' method='post' onChange={this.handleChange}>
				<span>User Name: </span>
				<input id="userName" type='text' name="userName" value={this.state.userName}/><br />
				<span>Password: </span>
				<input id="password" type='password' name="password" value={this.state.password}/><br /><br />
				<input type='submit' value="Log In" onClick={click}/>
			</form>
		);
	}
}