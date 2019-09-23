import React from "react";
import Avatar from "react-avatar";

import "./styles/Feed.scss";

function Feed(props) {
  const { items } = props;

  return (
    <div className="feed">
      {(items || []).map(item => (
        <FeedItem {...item} key={`Feed/${item.convo_id}`} />
      ))}
    </div>
  );
}

function FeedItem(props) {
  return (
    <>
      <div className="item">
        <div className="title">{props.title}</div>
        <div className="inner">
          <Metadata {...props} />
          <div className="body">{props.description}</div>
        </div>
      </div>
      <div className="break" />
    </>
  );
}

function Metadata(props) {
  return (
    <div className="meta">
      <PeopleInvolved people={props.contributors} description={props.involvedDescription} />
      <div className="creator">{props.creator}</div>
      <div className="convo-data">
        <div className="left">
          <div>Last Post at {props.last_post_at}</div>
          <div>{props.views} views</div>
        </div>
        <div className="right">
          <div>{props.likes}</div>
          <div>{props.commentCount}</div>
        </div>
      </div>
    </div>
  );
}

function PeopleInvolved(props) {
  return (
    <div className="discussed-by">
      <Avatar name={props.people[0]} round size={42} />
      <Avatar name={props.people[1]} round size={42} />
      <span className="text">
        <div>{props.description}</div>
      </span>
    </div>
  );
}

export default Feed;
