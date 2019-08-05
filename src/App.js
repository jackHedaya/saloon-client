import React from 'react';
import NavBar from './components/NavBar';
import ContentGrid from './components/ContentGrid.js';
import Content from './components/Content';
import LogIn from './components/LogIn';
import Register from './components/Register';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view: "saloon",
      user: null,
    }
  }

  navChangeView = e => {
    e.preventDefault();
    this.setState({
      view: e.target.dataset.index,
    });
  }

  viewConvo = e => {
    e.preventDefault();
    this.setState({
      view: "conversation",
    });
    this.ID = e.target.ID;
  }

  logIn = e => {
    return null;
  }

  render(){
    const view = this.state.view;
    if(this.state.view === "saloon"){
      return(
        <div>
          <NavBar userName='HighSheep' onClick={this.navChangeView}/>
          <ContentGrid onClick={this.viewConvo}/>

        </div>
      );
    } else if(view === "login"){
      return(
        <div>
          <NavBar userName='HighSheep' onClick={this.navChangeView}/>
          <LogIn onClick={this.logIn}/>

        </div>
      );
    } else if(view === "register"){
      return(
        <div>
          <NavBar userName='HighSheep' onClick={this.navChangeView}/>
          <Register onClick={this.register}/>

        </div>
      );
    } else if(view === "conversation"){
      return(
        <div>
          <NavBar userName='HighSheep' onClick={this.navChangeView}/>
          <Content view="full" ID={this.ID}/>
        </div>
      );
    } else {
      return(
        <div>
          <h>Error</h>
          <p>This page does not exist</p>
        </div>
      );
    }
  }
}
