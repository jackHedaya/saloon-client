import React from 'react';
import Content from './Content.js';
import './../style/contentGrid.css';


export default class ContentGrid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //ajax
      contentIDs: ['id123', 'id124','id125','id127', 'id124','id125','id126', 'id124','id125','id126', 'id124','id125','id126', 'id124','id125','id126', 'id124','id125','id126', 'id124','id125','id126', 'id124','id125','id126', 'id124']
    };
  }

  render() {
    const click = this.props.onClick;
  	return(
  	  <div id="ContentContainer">{this.state.contentIDs.map((ID, i) => <Content key={i} ID={ID} view='grid' onClick={click}/>)}</div>
  	);
  }
}