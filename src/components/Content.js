import React from 'react';
import {Icon} from 'antd';
import 'antd/es/icon/style/index.css';
import Conversation from './Posts.js';

export default class Content extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      view: props.view,
  	  ID: props.ID,
  	  //ajax based on ID
  	  title: 'Is God Fake?',
      authors: ['Sam Harris', 'Ben Shapiro'],
      description: 'Ben uses his sharp tounge to defend his ridiculous position',
      votes: null,
      commentsCount: 5553,
  	};
  }

  vote = v => {
  	//implement check with database
  	this.setState({votes: v > 0 ? this.state.votes+1 : this.state.votes-1});
  }

  render(){
    const authors = this.state.authors;
    const title = this.state.title;
    const votes = this.state.votes;
    const ID = this.state.ID;
    var head = (<a href={'/conversation/:'+ID}>{title}</a>);
    var posts = null;
    if (this.state.view === "full"){
      posts = (<Conversation ID={ID} />);
      head = title;
    }
    
	  return (
      <div>
  	    <div onClick={this.props.onClick}>
    	  	<h3>{head}</h3>
    	  	<p>Contributors: {authors.map((author, i) => [!!i && ", ", <span key={i}>{author}</span>])}</p>
    	  	<p id='description'>{this.state.description}</p>
        </div>
  	  	<span>{votes}<button onClick={() => this.vote(1)}><Icon type="up" /></button><button onClick={() => this.vote(-1)}><Icon type="down" /></button>&nbsp; &nbsp; &nbsp;{this.state.commentsCount} Comments</span>
        {posts}
  	  </div>
  	);
  }
}





