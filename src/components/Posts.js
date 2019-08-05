import React from 'react';

export default class Conversation extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			convoID: props.ID,
			//ajax
			postID: ['id1','id2','id3'],
		};
	}

	render(){
		const postIDs = this.state.postID;
		return(
			<div>
				{postIDs.map((postID, i) => <Post ID={postID} key={i}/>)}
			</div>
		);
	}
}

class Post extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			postID: props.ID,
			//ajax
			author: "King Harris",
			text: "The important distinction here is that God is Great",
			postOrder: 1,
		}
	}

	render(){
		return (
			<div>
				<hr/>
				<p>{this.state.author}:</p>
				<p>{this.state.text}</p>
			</div>
		);
	}
}