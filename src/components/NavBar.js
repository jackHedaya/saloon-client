import React from 'react';
import { Menu, Dropdown, Button, Input} from 'antd';
import 'antd/es/menu/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/dropdown/style/index.css';
import './../style/navBar.css';

export default class NavBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedin: false,
    }
  }

  //this is a temporary toggle for development

  render() {
    const {Search} = Input;
    const click = this.props.onClick;
    return (
      <div>
        <ul id='navbar' onClick={click}>
          <li className='link navbar' data-index="saloon" key="saloon"><a className='navbar' href='/' data-index="saloon">Saloon</a></li>
          <li className='search navbar' key="search"><Search className='search navbar' placeholder="Search..." onSearch={value => console.log(value)} enterButton/></li>
          {this.state.loggedin ? <UserMenu userName={this.props.userName}/> :
          <div>
            <li className='link navbar' data-index="login" key="login"><a className='navbar' href='/login' data-index="login">Log In</a></li>
            <li className='link navbar' data-index="register" key="register"><a className='navbar' href='/register' data-index="register">Register</a></li>
          </div> }
        </ul>
      </div>
    );
  }
}

function UserMenu (props){
  const menu = (
    <Menu>
      <Menu.Item><a href='/account'>Account</a></Menu.Item>
      <Menu.Item><a href='/profile'>Profile</a></Menu.Item>
      <Menu.Item><a href='/settings'>Settings</a></Menu.Item>
    </Menu>
  )

  
  return(
    <Dropdown overlay={menu} placement='bottomLeft'>
      <Button>{props.userName}</Button>
    </Dropdown>
  );
}