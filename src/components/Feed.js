import React from "react";
import Avatar from "react-avatar";

import "./styles/Feed.scss";

const FAKE_ITEM = {
  title: "Hello, World!",
  creator: "Johnny Smith",
  views: "1.2M views",
  likes: "30K likes",
  description: `Donald Trump and Bill gates along with many other 
    notable figures focus mainly on the topic of marijuana legalization.
    In this conversation however, many topics such as psychedelics 
    and opioid addiction are discussed in great detail and viewed 
    from different perspectives.`,
  commentCount: "10,000 comments",
  edited: "3 hours ago",
  peopleInvolved: ["Bernie Sanders", "Hillary Clinton"],
  involvedDescription: "Discussion by Jack Hedaya, John Cena, and 19 more"
};

function Feed(props) {
  // const { items = [] } = props;

  return (
    <div className="feed">
      {/* {items.map(item => <FeedItem {...item} title="Hello, World" />)} */}
      <FeedItem {...FAKE_ITEM} />
      <FeedItem {...FAKE_ITEM} />
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
      <PeopleInvolved people={props.peopleInvolved} description={props.involvedDescription} />
      <div className="creator">{props.creator}</div>
      <div className="convo-data">
        <div className="left">
          <div>{props.edited}</div>
          <div>{props.views}</div>
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
